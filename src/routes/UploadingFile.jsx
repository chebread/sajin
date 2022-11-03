import FooterButton from 'components/FooterButton';
import CenterScreen from 'components/CenterScreen';
import SvgBigXMark from 'icons/SvgBoldXMark';
import SvgLoading from 'icons/SvgLoading';
import styled from 'styled-components';

const UploadingFile = () => {
  const onClickCancle = () => {
    // 파일 올리기 취소하기
    // 만약 파일에 대한 참조나 파일 그자체에 대해 참조가 생성되었다면 올리기 취소 기능 활성화 하기
  };
  return (
    <>
      <CenterScreen position="absolute">
        <Loading>
          <SvgWrapper>
            <SvgLoading />
          </SvgWrapper>
        </Loading>
      </CenterScreen>
      <FooterButton onClick={onClickCancle}>
        <SvgBigXMark />
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
export default UploadingFile;
