import { decode } from 'js-base64';

const base64Decoder = ({ data }) => {
  const decodedBase64 = decode(data);
  return decodedBase64;
};

export default base64Decoder;
