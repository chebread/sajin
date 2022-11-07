import FooterButton from 'components/FooterButton';
import CenterScreen from 'components/CenterScreen';
import HelmetTemplate from 'components/HelmetTemplate';
import SvgError from 'icons/SvgError';
import SvgHome from 'icons/SvgHome';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotLoadedFile = () => {
  const navigate = useNavigate();
  const seoContent = useRef({
    title: 'This page cannot be found',
    description: `This page in your current location is not provided by Sajin`,
  });

  useEffect(() => {
    toast('This page cannot be found');
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
          <SvgError />
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
