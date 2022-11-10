import firebase from 'lib/firebase';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
} from 'firebase/storage';
// Initialize Firebase

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebase);

export {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
};
