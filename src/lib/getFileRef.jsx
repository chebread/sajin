import loadFile from './loadFile';
import { ref, storage } from 'lib/storage';

const getFileRef = async ({ fileId }) => {
  const fileDb = await loadFile({ fileId });
  const filename = fileDb.filename;
  const fileRef = ref(storage, `images/${filename}`);
  return fileRef;
};

export default getFileRef;
