import { atom } from 'recoil';

const errorCodeState = atom({
  key: 'errorState',
  default: null,
});
export { errorCodeState };
