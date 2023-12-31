import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCgyt_fd2P2ecm3No86JQBWbx9s6gdIVLA',
  authDomain: 'clone-twitter-d6fa9.firebaseapp.com',
  projectId: 'clone-twitter-d6fa9',
  storageBucket: 'clone-twitter-d6fa9.appspot.com',
  messagingSenderId: '380057954535',
  appId: '1:380057954535:web:f0f78a05eb847c44425a42',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);
