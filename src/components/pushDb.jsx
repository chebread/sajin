import { storage, ref, getDownloadURL } from 'components/storage';
import { db, setDoc, doc } from 'components/firestore';
import hashConstructor from 'components/hashConstructor';

const pushDb = async ({ filename }) => {
  const docId = hashConstructor(); // 이것이 파일을 접근하게 하는 해시임
  const fileRef = ref(storage, filename); // 올린 파일을 접근하는 참조
  // 올려진 파일에 대한 파일 접근 url을 가져옴
  await getDownloadURL(fileRef).then(fileUrl => {
    // 파일의 url과 id를 가진 문서를 images 라는 폴더에 추가함
    setDoc(doc(db, 'images', `${docId}`), {
      url: fileUrl,
      filename: filename, // db에서 doc과 파일을 삭제할때 filename과 doc id이 필요함
    });
  });
  return docId; // 모든 작업후 docId 반환
};

export default pushDb;
