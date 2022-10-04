import firebase from 'components/firebase';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
// Initialize Firebase

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebase);
export { storage, ref, uploadBytes };
