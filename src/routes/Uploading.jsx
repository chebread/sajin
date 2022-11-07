import FooterButton from 'components/FooterButton';
import CenterScreen from 'components/CenterScreen';
import SvgXMark from 'icons/SvgXMark';
import SvgLoading from 'icons/SvgLoading';
import styled from 'styled-components';

const Uploading = ({ onClick }) => {
  return (
    <>
      <CenterScreen position="absolute">
        <Loading>
          <SvgWrapper>
            <SvgLoading />
          </SvgWrapper>
        </Loading>
      </CenterScreen>
      <FooterButton onClick={onClick}>
        <SvgXMark />
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
const Loading = styled.div`
  height: 200px;
  width: 200px;
  -webkit-animation: load 1.5s infinite linear;
  animation: load 1.5s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  position: absolute;
  @-webkit-keyframes load {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
export default Uploading;
