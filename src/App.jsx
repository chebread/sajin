import Router from 'components/Router';
import { useRef } from 'react';
import HelmetTemplate from 'components/HelmetTemplate';
import FullScreen from 'components/FullScreen';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';

const App = () => {
  const seoContent = useRef({
    title: 'Sajin',
    desc: 'Easily share or save your photos with friends with Sajin',
  });
  return (
    <FullScreen>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1500,
        }}
      />
      <HelmetTemplate
        title={seoContent.current.title}
        desc={seoContent.current.desc}
      />
      <Router />
    </FullScreen>
  );
};

export default App;
