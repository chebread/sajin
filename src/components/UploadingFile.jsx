import SvgLoading from 'icons/SvgLoading';
import styled from 'styled-components';

const UploadingFile = () => {
  return (
    <FullScreen>
      <Loading>
        <SvgLoading height={200} width={200} />
      </Loading>
    </FullScreen>
  );
};
const FullScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
