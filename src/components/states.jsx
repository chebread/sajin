import { atom } from 'recoil';

const dbRefIdState = atom({
  key: 'dbRefIdState',
  default: null,
});

const isFileDeletedState = atom({
  key: 'isFileDeletedState',
  default: false,
});

export { dbRefIdState, isFileDeletedState };
