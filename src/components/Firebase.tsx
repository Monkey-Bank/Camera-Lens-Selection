import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCU_cMY4ZOKYyO1Pfh4mW_nYwszRBpkjF8',
  authDomain: 'camera-lens-selection.firebaseapp.com',
  projectId: 'camera-lens-selection',
  storageBucket: 'camera-lens-selection.firebasestorage.app',
  messagingSenderId: '518641734818',
  appId: '1:518641734818:web:11be26d1801fbe20e373fb',
  measurementId: 'G-9GLHXDGF8D',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db, analytics };
