import firebase from 'components/firebase';
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
} from 'firebase/firestore';
// Initialize Firebase

// Initialize Cloud Storage and get a reference to the service
const db = getFirestore(firebase);

export { db, collection, addDoc, getDoc, doc };
