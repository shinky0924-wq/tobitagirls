import { initializeApp } from 'firebase/app';
import { initializeFirestore, collection, addDoc, getDocs, setDoc, doc, getDoc, query, orderBy, deleteDoc, updateDoc } from 'firebase/firestore';
import config from '../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId
};

const app = initializeApp(firebaseConfig);

// Use custom firestore database ID if specified in config
export const db = initializeFirestore(app, {}, config.firestoreDatabaseId || '(default)');

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
    console.error('Error submitting consultation to Firebase:', e);
    throw e;
  }
}

// Helper to get all consultations (for Admin panel)
export async function getConsultations(): Promise<ConsultationSubmission[]> {
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
    console.error('Error fetching consultations from Firebase:', e);
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
    console.error('Error updating consultation status:', e);
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
    console.error('Error deleting consultation:', e);
    return false;
  }
}
