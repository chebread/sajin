import ErrorTemplate from 'components/ErrorTemplate';
import SvgError from 'icons/SvgError';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const ServiceUnavailable = () => {
  useEffect(() => {
    toast.error('The server could not process the request');
  }, []);
  return (
    <ErrorTemplate>
      <SvgError />
    </ErrorTemplate>
  );
};

export default ServiceUnavailable;
