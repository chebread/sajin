import { atom } from 'recoil';

const dbRefIdState = atom({
  key: 'dbRefIdState',
  default: '',
});

export { dbRefIdState };
