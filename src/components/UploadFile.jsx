import { useRef } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import SvgPlus from 'icons/SvgPlus';
import SvgAddSajin from 'icons/SvgAddSajin';
import FixedFooterButton from 'components/buttons/FixedFooterButton';

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
            <LogoZone>
              <SvgWrapper>
                <SvgAddSajin />
              </SvgWrapper>
            </LogoZone>
          </DropZone>
          <FixedFooterButton onClick={open}>
            <SvgPlus />
          </FixedFooterButton>
        </>
      )}
    </Dropzone>
  );
};
const DropZone = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;
const LogoZone = styled.div`
  position: relative;
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

export default UploadFile;
