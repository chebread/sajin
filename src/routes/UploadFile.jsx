import { useRef } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import SvgPlus from 'icons/SvgPlus';
import SvgAddSajin from 'icons/SvgAddSajin';
import FooterButton from 'components/FooterButton';
import CenterScreen from 'components/CenterScreen';

const UploadFile = ({ onDrop }) => {
  const accept = useRef({
    'image/*': [], // 이미지 파일 전체를 받음
  });

  return (
    <Dropzone onDrop={onDrop} accept={accept.current} noClick>
      {({ getRootProps, getInputProps, open, isDragActive }) => (
        <>
          <DropZone {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <DropGuideZone position="fixed">
                <DropGuide>
                  <SvgPlus />
                </DropGuide>
              </DropGuideZone>
            ) : (
              <>
                <CenterScreen position="relative">
                  <SvgWrapper>
                    <SvgAddSajin />
                  </SvgWrapper>
                </CenterScreen>
              </>
            )}
          </DropZone>
          {!isDragActive ? (
            <FooterButton onClick={open}>
              <SvgPlus />
            </FooterButton>
          ) : (
            ''
          )}
        </>
      )}
    </Dropzone>
  );
};

const DropZone = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
`;
const SvgWrapper = styled.div`
  svg {
    height: 200px;
    width: 200px;
  }
`;
const DropGuideZone = styled(CenterScreen)`
  z-index: 1;
`;
const DropGuide = styled.div`
  z-index: 1;
  cursor: copy; // add image cursur
  height: calc(100% - 30px);
  width: calc(100% - 30px);
  border-radius: 60px;
  background-color: #b2f2bb;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    height: 200px;
    width: 200px;
  }
`;
export default UploadFile;
