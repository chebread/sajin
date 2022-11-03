import { atom } from 'recoil';

const fileIdRefState = atom({
  key: 'fileIdRefState',
  default: null,
});

const fileDbIdRefState = atom({
  key: 'fileDbIdRefState',
  default: null,
});

export { fileIdRefState, fileDbIdRefState };
