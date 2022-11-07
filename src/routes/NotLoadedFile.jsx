import FooterButton from 'components/FooterButton';
import CenterScreen from 'components/CenterScreen';
import HelmetTemplate from 'components/HelmetTemplate';
import SvgHome from 'icons/SvgHome';
import SvgBigXMark from 'icons/SvgBigXMark';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotLoadedFile = () => {
  const navigate = useNavigate();
  const seoContent = useRef({
    title: 'This file cannot be loaded',
    description: `This file is not uploaded to Sajin`,
  });

  useEffect(() => {
    toast.error('This file cannot be loaded');
  }, []);
  const onClickRedirect = () => navigate('/');
  return (
    <>
      <HelmetTemplate
        title={seoContent.current.title}
        desc={seoContent.current.desc}
      />
      <CenterScreen position="absolute">
        <SvgWrapper>
          <SvgBigXMark />
        </SvgWrapper>
      </CenterScreen>
      <FooterButton onClick={onClickRedirect}>
        <SvgHome />
      </FooterButton>
    </>
  );
};
const SvgWrapper = styled.div`
  svg {
    height: 200px;
    width: 200px;
  }
`;
export default NotLoadedFile;
