import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import ViewerRoundButton from 'components/ViewerRoundButton';

const CopyButton = ({ children, url }) => {
  const onCopy = () => {
    toast.success('Copied link to this file');
  };
  return (
    <CopyToClipboard text={url} onCopy={onCopy}>
      <ViewerRoundButton>{children}</ViewerRoundButton>
    </CopyToClipboard>
  );
};

export default CopyButton;
