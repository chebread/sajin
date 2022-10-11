import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import SvgAddImage from 'icons/SvgAddImage';
import SvgPlus from 'icons/SvgPlus';

const UploadFile = ({ onDrop }) => {
  const accept = {
    'image/*': ['.jpeg', '.jpg', '.png', '.svg', '.ico', '.gif'],
  };
  return (
    <Dropzone onDrop={onDrop} accept={accept} noClick>
      {({ getRootProps, getInputProps, open, isDragActive }) => (
        <>
          {isDragActive ? (
            <DropFrame>
              <DropFrameBorder />
            </DropFrame>
          ) : (
            ''
          )}
          <DropZone {...getRootProps()}>
            {/* 전역이 Dropzone이 됨 */}
            {/* {isDragActive ? <DragFrame /> : ''} */}
            <input {...getInputProps()} />
            {/* 이게 하나의 클릭 이벤트가 됨 */}
            <SvgWrapper>
              <SvgAddImage height={200} width={200} />
            </SvgWrapper>
            <Blank />
            <Button onClick={open}>
              <SvgPlus height={45} width={45} />
            </Button>
          </DropZone>
        </>
      )}
    </Dropzone>
  );
};
const DropFrame = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 15px;
`;
const DropFrameBorder = styled.div`
  height: calc(100% - 30px);
  width: calc(100% - 30px);
  border: 2.5px solid #8ce99a;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: #d3f9d8;
  z-index: 1;
`;
const DropZone = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const SvgWrapper = styled.div`
  svg {
    height: 200px;
    width: 200px;
  }
`;
const Blank = styled.div`
  padding: 5px;
`;
const Button = styled.button`
  all: unset;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 105px;
  height: 65px;
  border-radius: 20px;
  background-color: #e9ecef;
`;
export default UploadFile;
