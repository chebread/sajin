import SvgXMark from 'icons/SvgXMark';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import ErrorTemplate from 'components/ErrorTemplate';
import HelmetTemplate from 'components/HelmetTemplate';

const NotLoadedFile = () => {
  const seoContent = useRef({
    title: 'This file cannot be loaded',
    description: `This file is not uploaded to Sajin`,
  });

  useEffect(() => {
    toast.error('This file cannot be loaded');
  }, []);
  return (
    <>
      <HelmetTemplate
        title={seoContent.current.title}
        desc={seoContent.current.desc}
      />
      <ErrorTemplate>
        <SvgXMark />
      </ErrorTemplate>
    </>
  );
};

export default NotLoadedFile;
