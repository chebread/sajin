import { storage, ref, getDownloadURL } from 'components/storage';
import { db, setDoc, doc } from 'components/firestore';
import hashConstructor from './hashConstructor';

const pushDb = async ({ filename }) => {
  const docId = hashConstructor(); // 이것이 접근하게 하는 해시임
  // onsole.log('firestore id ' + docId);
  const fileRef = ref(storage, filename);
  await getDownloadURL(fileRef).then(fileUrl => {
    // 에러 확인 로직 필요
    setDoc(doc(db, 'images', `${docId}`), {
      url: fileUrl,
      filename: filename, // db에서 doc과 파일을 삭제할때 filename과 doc id이 필요함
    });
  });
  return docId;
};

export default pushDb;
