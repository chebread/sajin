import { encode } from 'js-base64';

const base64Encoder = ({ data }) => {
  const encodedBase64 = encode(data);
  return encodedBase64;
};

export default base64Encoder;
