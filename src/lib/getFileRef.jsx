import loadFile from './loadFile';
import { ref, storage } from 'lib/storage';

const getFileRef = async ({ fileId }) => {
  const fileDb = await loadFile({ fileId });
  const filename = fileDb.filename;
  // 오류 로직 필요
  // 이미지 파일 삭제
  const fileRef = ref(storage, filename);
  return fileRef;
};

export default getFileRef;
