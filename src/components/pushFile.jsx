import hashConstructor from './hashConstructor';
import { storage, ref, uploadBytes } from 'components/storage';
import pushDb from 'components/pushDb';

const pushFile = async ({ file }) => {
  const refName = hashConstructor(); // 이미지 파일 이름
  const storageRef = ref(storage, `${refName}`); // 참조 생성
  const metadata = {
    contentType: null, // 모든 이미지 형식 받음
  };
  await uploadBytes(storageRef, file, metadata); // 파일을 업로드함
  const filename = storageRef.name; // Storage에서 참조할 파일 이름 가져옴
  const fileRefId = await pushDb({ filename }); // filestore에 이 파일을 참조할 데이터를 저장함
  return fileRefId;
};

export default pushFile;
