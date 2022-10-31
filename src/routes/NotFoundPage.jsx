import ErrorTemplate from 'components/ErrorTemplate';
import HelmetTemplate from 'components/HelmetTemplate';
import SvgError from 'icons/SvgError';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const NotFoundPage = () => {
  const seoContent = useRef({
    title: 'This page cannot be found',
    description: `This page in your current location is not provided by Sajin`,
  });

  useEffect(() => {
    toast.error('This page cannot be found');
  }, []);
  return (
    <>
      <HelmetTemplate
        title={seoContent.current.title}
        desc={seoContent.current.desc}
      />
      <ErrorTemplate>
        <SvgError />
      </ErrorTemplate>
    </>
  );
};

export default NotFoundPage;
