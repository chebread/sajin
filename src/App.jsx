import Router from 'components/Router';
import { useRef } from 'react';
import HelmetTemplate from 'components/HelmetTemplate';
import styled from 'styled-components';

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
      <Router></Router>
    </FullScreen>
  );
};
const FullScreen = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;
export default App;
