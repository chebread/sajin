import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from 'components/Button';
import toast from 'react-hot-toast';

const CopyButton = ({ children, url }) => {
  const onCopy = () => {
    toast.success('Copied link to this file');
  };
  return (
    <CopyToClipboard text={url} onCopy={onCopy}>
      <Button>{children}</Button>
    </CopyToClipboard>
  );
};

export default CopyButton;
