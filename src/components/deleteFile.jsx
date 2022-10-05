import { db, doc, deleteDoc } from 'components/firestore';
import { ref, storage, deleteObject } from 'components/storage';
import loadFile from './loadFile';

const deleteFile = ({ fileId }) => {
  // const [filename, setFilename] = useState('');
  const fileDb = loadFile({ fileId });
  fileDb.then(async data => {
    const filename = data.filename;
    // 오류 로직 필요
    // 이미지 파일 삭제
    const fileRef = ref(storage, filename);
    await deleteObject(fileRef)
      .then(() => {})
      .catch(error => {});
    // 문서 참조 데이터 삭제
    // 오류 로직 필요
    deleteDoc(doc(db, 'images', fileId));
  });
};

export default deleteFile;
