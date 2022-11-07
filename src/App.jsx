import Router from 'components/Router';
import { useRef } from 'react';
import HelmetTemplate from 'components/HelmetTemplate';
import FullScreen from 'components/FullScreen';
import Notify from 'components/Notify';

const App = () => {
  const seoContent = useRef({
    title: 'Sajin',
    desc: 'Easily share or save your photos with friends with Sajin',
  });
  return (
    <FullScreen>
      <HelmetTemplate
        title={seoContent.current.title}
        desc={seoContent.current.desc}
      />
      {/* <Notify /> */}
      <Router />
    </FullScreen>
  );
};

export default App;
