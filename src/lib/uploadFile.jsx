import hashConstructor from 'lib/hashConstructor';
import { storage, ref, uploadBytes, getDownloadURL } from 'lib/storage';
import { db, setDoc, doc } from 'lib/firestore';

const uploadFile = async ({ file }) => {
  const fileRefId = hashConstructor();
  const docRefId = hashConstructor();
  const fileRef = ref(storage, `images/${fileRefId}`);
  const docRef = doc(db, 'images', `${docRefId}`);
  const metadata = {
    contentType: null,
  };
  await uploadBytes(fileRef, file, metadata);
  await setDoc(docRe, {
    url: await getDownloadURL(fileRef),
    filename: fileRefId,
  });
  return docRefId;
};

export default uploadFile;
