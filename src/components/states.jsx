import { atom } from 'recoil';

const dbRefIdState = atom({
  key: 'dbRefIdState',
  default: 'sdf', // original: null
});

const isFileDeletedState = atom({
  key: 'isFileDeletedState',
  default: false,
});

// const isCopyFileState = atom({
//   key: 'isCopyFileState',
//   default: true,
// });

export { dbRefIdState, isFileDeletedState };
