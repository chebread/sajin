import { atom } from 'recoil';

const dbRefIdState = atom({
  key: 'dbRefIdState',
  default: null, // original: null
}); // (0) 이게 왜 이렇게 되야 하는지 고려 필요

// const isFileDeletedState = atom({
//   key: 'isFileDeletedState',
//   default: false,
// });

export { dbRefIdState };
