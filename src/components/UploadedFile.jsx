import { Link } from 'react-router-dom';
import CopyButton from './CopyButton';
// import { useSetRecoilState } from 'recoil';
// import { isCopyFileState } from './states';

const UploadedFile = ({ imageId }) => {
  // const setisCopyFile = useSetRecoilState(isCopyFileState);
  const thisUrl = location.href;
  // const onClick = () => {
  //   // 여기서 그냥 카피를 놓치고 갈 경우에만 경고창을 상시 띄운다!
  // };
  return (
    <div>
      <h1>Uploaded</h1>
      <p>Check out photos uploaded from </p>
      <CopyButton url={thisUrl}>Copy the photo you uploaded</CopyButton>{' '}
      {/* svg 치환 */}
      <Link to={`i?id=${imageId}`}>Check out the uploaded photos</Link>
      {/* onClick={onClick} */}
      {/* => icon으로 svg 치환 */}
    </div>
  );
};

export default UploadedFile;
