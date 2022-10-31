import { atom } from 'recoil';

const isGoHomeState = atom({
  key: 'isGoHomeState',
  default: false,
});
const isGoBackState = atom({
  key: 'isGoBackState',
  default: false,
});

export { isGoHomeState, isGoBackState };
