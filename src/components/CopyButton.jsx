import Clipboard from 'clipboard';
import Button from 'components/Button';

const CopyButton = ({ children, url, onClick }) => {
  const clipboard = new Clipboard('#copy-btn');
  // 배너작동은 onclick으로!
  // 에러 처리 필요
  clipboard.on('error', function (e) {
    console.log(e);
  });

  return (
    <Button id="copy-btn" data-clipboard-text={url} onClick={onClick}>
      {children}
    </Button>
  );
};

export default CopyButton;
