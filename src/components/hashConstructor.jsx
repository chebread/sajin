import { v4 as uuidv4 } from 'uuid';

const hashConstructor = () => {
  return uuidv4().replace(/-/g, '');
};

export default hashConstructor;
