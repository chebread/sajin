import { storage, ref, getDownloadURL } from 'components/storage';
import { db, setDoc, doc } from 'components/firestore';
import hashConstructor from './hashConstructor';

const pushDb = ({ filename, setDbRefId }) => {
  // 메서드 내에서 recoil 사용하는 방법 찾기
  const fileRef = ref(storage, filename);
  getDownloadURL(fileRef).then(async fileUrl => {
    // 에러 확인 로직 필요
    const docId = hashConstructor(); // 이것이 접근하게 하는 해시임
    await setDoc(doc(db, 'images', `${docId}`), {
      url: fileUrl,
    });
    // setDoc 에러 확인 로직후 실행함
    setDbRefId(docId); // 파일의 url image link를 참조할 수 있는 id를 전체에 저장함
  });
};

export default pushDb;
