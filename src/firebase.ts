import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  getDoc,
  query,
  orderBy,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import config from '../firebase-applet-config.json';
import { BlogArticle } from './blogData';
import { SiteContent } from './siteContent';

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

// Force long-polling so proxied/iframe browsers do not hang for 10s on WebChannel streams
function createFirestoreInstance() {
  const settings = { experimentalForceLongPolling: true };
  try {
    return config.firestoreDatabaseId
      ? initializeFirestore(app, settings, config.firestoreDatabaseId)
      : initializeFirestore(app, settings);
  } catch {
    return config.firestoreDatabaseId
      ? getFirestore(app, config.firestoreDatabaseId)
      : getFirestore(app);
  }
}

export const db = createFirestoreInstance();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): void {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// In-memory & session storage flag to avoid repeated failing calls when daily quota is reached
let quotaExceededDetected = false;

function isQuotaExceededError(error: unknown): boolean {
  if (!error) return false;
  const msg = error instanceof Error ? error.message : String(error);
  const code = (error as any)?.code;
  return (
    code === 'resource-exhausted' ||
    msg.toLowerCase().includes('quota limit exceeded') ||
    msg.toLowerCase().includes('quota exceeded') ||
    msg.toLowerCase().includes('resource_exhausted')
  );
}

function isPermissionDeniedError(error: unknown): boolean {
  if (!error) return false;
  const msg = error instanceof Error ? error.message : String(error);
  const code = (error as any)?.code;
  return (
    code === 'permission-denied' ||
    msg.toLowerCase().includes('missing or insufficient permissions')
  );
}

export function isFirestoreQuotaExceeded(): boolean {
  if (quotaExceededDetected) return true;
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      if (window.sessionStorage.getItem('firestore_quota_exceeded') === 'true') {
        quotaExceededDetected = true;
        return true;
      }
    }
  } catch {
    // ignore
  }
  return false;
}

function handleQuotaOrError(
  operation: string,
  e: unknown,
  operationType?: OperationType,
  path?: string
): void {
  if (isPermissionDeniedError(e) && operationType) {
    handleFirestoreError(e, operationType, path || null);
    return;
  }
  if (isQuotaExceededError(e)) {
    quotaExceededDetected = true;
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem('firestore_quota_exceeded', 'true');
      }
    } catch {
      // ignore
    }
    console.warn(
      `[Firestore] Daily quota limit reached during "${operation}". Using local fallback static data. Quota will reset the following day.`
    );
  } else {
    console.warn(`[Firestore] Operation "${operation}" did not complete:`, e instanceof Error ? e.message : e);
  }
}

// Helper function to submit a consultation
export interface ConsultationSubmission {
  id?: string;
  name: string;
  age: string;
  contact: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'contacted';
  source: 'website';
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Firestore timeout (${ms}ms) during ${label}`));
    }, ms);
    promise.then(
      (val) => {
        clearTimeout(timer);
        resolve(val);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

export async function submitConsultation(submission: Omit<ConsultationSubmission, 'createdAt' | 'status' | 'source'>) {
  try {
    const colRef = collection(db, 'consultations');
    const docRef = await addDoc(colRef, {
      ...submission,
      createdAt: new Date().toISOString(),
      status: 'unread',
      source: 'website'
    });
    return { success: true, id: docRef.id };
  } catch (e) {
    handleQuotaOrError('submitConsultation', e, OperationType.CREATE, 'consultations');
    return { success: false, fallbackSaved: true };
  }
}

// Helper to get all consultations (for Admin panel)
export async function getConsultations(): Promise<ConsultationSubmission[]> {
  if (isFirestoreQuotaExceeded()) {
    return [];
  }
  try {
    const colRef = collection(db, 'consultations');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await withTimeout(getDocs(q), 6000, 'getConsultations');
    const submissions: ConsultationSubmission[] = [];
    snapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        ...doc.data()
      } as ConsultationSubmission);
    });
    return submissions;
  } catch (e) {
    handleQuotaOrError('getConsultations', e, OperationType.LIST, 'consultations');
    return [];
  }
}

// Helper to update consultation status
export async function updateConsultationStatus(id: string, status: 'unread' | 'read' | 'contacted') {
  try {
    const docRef = doc(db, 'consultations', id);
    await updateDoc(docRef, { status });
    return true;
  } catch (e) {
    handleQuotaOrError('updateConsultationStatus', e, OperationType.UPDATE, `consultations/${id}`);
    return false;
  }
}

// Helper to delete a consultation
export async function deleteConsultation(id: string) {
  try {
    const docRef = doc(db, 'consultations', id);
    await deleteDoc(docRef);
    return true;
  } catch (e) {
    handleQuotaOrError('deleteConsultation', e, OperationType.DELETE, `consultations/${id}`);
    return false;
  }
}

// Save blog articles to Firestore (under collection 'cms', document 'blog')
export async function saveBlogArticlesToFirestore(articles: BlogArticle[]): Promise<boolean> {
  if (isFirestoreQuotaExceeded()) {
    return false;
  }
  try {
    const docRef = doc(db, 'cms', 'blog');
    await setDoc(docRef, { articles });
    return true;
  } catch (e) {
    handleQuotaOrError('saveBlogArticlesToFirestore', e, OperationType.WRITE, 'cms/blog');
    return false;
  }
}

// Get blog articles from Firestore (returns null if not exists or on error)
export async function getBlogArticlesFromFirestore(): Promise<BlogArticle[] | null> {
  if (isFirestoreQuotaExceeded()) {
    return null;
  }
  try {
    const docRef = doc(db, 'cms', 'blog');
    const docSnap = await withTimeout(getDoc(docRef), 6000, 'getBlogArticlesFromFirestore');
    if (docSnap.exists()) {
      const data = docSnap.data();
      return (data.articles as BlogArticle[]) || null;
    }
    return null;
  } catch (e) {
    handleQuotaOrError('getBlogArticlesFromFirestore', e, OperationType.GET, 'cms/blog');
    return null;
  }
}

// Save site content to Firestore (under collection 'cms', document 'site')
export async function saveSiteContentToFirestore(content: SiteContent): Promise<boolean> {
  if (isFirestoreQuotaExceeded()) {
    return false;
  }
  try {
    const docRef = doc(db, 'cms', 'site');
    await setDoc(docRef, { content });
    return true;
  } catch (e) {
    handleQuotaOrError('saveSiteContentToFirestore', e, OperationType.WRITE, 'cms/site');
    return false;
  }
}

// Get site content from Firestore (returns null if not exists or on error)
export async function getSiteContentFromFirestore(): Promise<SiteContent | null> {
  if (isFirestoreQuotaExceeded()) {
    return null;
  }
  try {
    const docRef = doc(db, 'cms', 'site');
    const docSnap = await withTimeout(getDoc(docRef), 6000, 'getSiteContentFromFirestore');
    if (docSnap.exists()) {
      const data = docSnap.data();
      return (data.content as SiteContent) || null;
    }
    return null;
  } catch (e) {
    handleQuotaOrError('getSiteContentFromFirestore', e, OperationType.GET, 'cms/site');
    return null;
  }
}
