import hashConstructor from './hashConstructor';
import { storage, ref, uploadBytes } from 'components/storage';
import pushDb from './pushDb';

const pushFile = ({ file }) => {
  const refName = hashConstructor(); // 이미지 파일 이름
  const storageRef = ref(storage, `${refName}`);
  const metadata = {
    contentType: null, // 모든 이미지 형식 받음
  };
  // 에러 확인 로직 필요
  // 파일이 업로드됨
  uploadBytes(storageRef, file, metadata).then(snapshot => {});
  const filename = storageRef.name; // Storage에서 참조할 파일 이름 가져옴
  return pushDb({ filename });
};

export default pushFile;
