import { storage, ref, getDownloadURL } from 'components/storage';
import { db, setDoc, doc } from 'components/firestore';
import hashConstructor from './hashConstructor';

const pushDb = ({ filename, setDbRefId }) => {
  console.log('filename ' + filename);
  const docId = hashConstructor(); // 이것이 접근하게 하는 해시임
  const fileRef = ref(storage, filename);
  getDownloadURL(fileRef).then(async fileUrl => {
    // 에러 확인 로직 필요
    await setDoc(doc(db, 'images', `${docId}`), {
      url: fileUrl,
      filename: filename, // db에서 doc과 파일을 삭제할때 filename과 doc id이 필요함
    });
    // setDoc 에러 확인 로직후 실행함
    setDbRefId(docId); // 파일의 url image link를 참조할 수 있는 id를 전체에 저장함
  });
};

export default pushDb;
