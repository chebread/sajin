import hashConstructor from './hashConstructor';
import { storage, ref, uploadBytes } from 'components/storage';
import pushDb from './pushDb';

const pushFile = ({ file, setDbRefId }) => {
  const refName = hashConstructor(); // 이미지 파일 이름
  const storageRef = ref(storage, `${refName}`);
  const metadata = {
    contentType: null, // 모든 이미지 형식 받음
  };
  uploadBytes(storageRef, file, metadata).then(snapshot => {
    // 에러 확인 로직 필요
    // 파일이 업로드됨
    const filename = storageRef.name; // Storage에서 참조할 파일 이름 가져옴
    pushDb({ filename, setDbRefId });
  });
};

export default pushFile;
