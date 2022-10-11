import ErrorTemplate from 'components/ErrorTemplate';
import SvgError from 'icons/SvgError';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const NotFoundPage = () => {
  useEffect(() => {
    toast.error('This page cannot be found');
  }, []);
  return (
    <ErrorTemplate>
      <SvgError />
    </ErrorTemplate>
  );
};

export default NotFoundPage;
