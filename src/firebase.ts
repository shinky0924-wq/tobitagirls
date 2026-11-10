import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, getDoc, query, orderBy, deleteDoc, updateDoc } from 'firebase/firestore';
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

// Use custom firestore database ID if specified in config
export const db = config.firestoreDatabaseId 
  ? getFirestore(app, config.firestoreDatabaseId)
  : getFirestore(app);

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

function handleQuotaOrError(operation: string, e: unknown): void {
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
    handleQuotaOrError('submitConsultation', e);
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
    const snapshot = await getDocs(q);
    const submissions: ConsultationSubmission[] = [];
    snapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        ...doc.data()
      } as ConsultationSubmission);
    });
    return submissions;
  } catch (e) {
    handleQuotaOrError('getConsultations', e);
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
    handleQuotaOrError('updateConsultationStatus', e);
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
    handleQuotaOrError('deleteConsultation', e);
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
    handleQuotaOrError('saveBlogArticlesToFirestore', e);
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
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return (data.articles as BlogArticle[]) || null;
    }
    return null;
  } catch (e) {
    handleQuotaOrError('getBlogArticlesFromFirestore', e);
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
    handleQuotaOrError('saveSiteContentToFirestore', e);
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
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return (data.content as SiteContent) || null;
    }
    return null;
  } catch (e) {
    handleQuotaOrError('getSiteContentFromFirestore', e);
    return null;
  }
}
