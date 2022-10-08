import Clipboard from 'clipboard';
import Button from 'components/Button';

const CopyButton = ({ children, url, onClick }) => {
  // onClick이 undefined (인자 제공 불허) 이면 그냥 속성이 disabled 됨!
  const clipboard = new Clipboard('#copy-btn');
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
