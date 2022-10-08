import { Link } from 'react-router-dom';
import CopyButton from 'components/CopyButton';

const UploadedFile = ({ imageId }) => {
  const thisUrl = location.href;
  const onClickCopy = () => {
    // 알림 발생하기
  };
  return (
    <div>
      <h1>Uploaded</h1>
      <p>Check out photos uploaded from </p>
      <CopyButton url={thisUrl} onClick={onClickCopy}>
        Copy the photo you uploaded
      </CopyButton>{' '}
      {/* svg 치환 */}
      <Link to={`i?id=${imageId}`}>Check out the uploaded photos</Link>
      {/* => icon으로 svg 치환 */}
    </div>
  );
};

export default UploadedFile;
