import { db, doc, deleteDoc } from 'components/firestore';
import { deleteObject } from 'components/storage';
import getFileRef from 'components/getFileRef';

const deleteFile = async ({ fileId }) => {
  getFileRef({ fileId }).then(fileRef => {
    Promise.all([
      // storage에 있는 파일 삭제
      deleteObject(fileRef),
      // db에 있는 파일 삭제
      deleteDoc(doc(db, 'images', fileId)),
    ]);
  }); // storage의 그 자체의 파일 참조 아이디
};

export default deleteFile;
