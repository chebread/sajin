import SvgXMark from 'icons/SvgXMark';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import ErrorTemplate from './ErrorTemplate';

const NotLoadedFile = () => {
  useEffect(() => {
    toast.error('This file cannot be loaded');
  }, []);
  return (
    <ErrorTemplate>
      <SvgXMark />
    </ErrorTemplate>
  );
};

export default NotLoadedFile;
