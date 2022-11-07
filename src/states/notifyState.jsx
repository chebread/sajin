import atom from 'recoil';

const notifyState = atom({
  key: 'notifyState',
  default: [],
});

export default notifyState;
