const onClickLicense = () => {
  Object.assign(document.createElement('a'), {
    target: '_blank',
    rel: 'noopener noreferrer',
    href: 'https://github.com/chebread',
  }).click();
};

import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import SvgPlus from 'icons/SvgPlus';
import SvgAddSajin from 'icons/SvgAddSajin';
import SvgLicense from 'icons/SvgLicense';
import { useRef } from 'react';
import RoundButton from './RoundButton';

const UploadFile = ({ onDrop }) => {
  const accept = useRef({
    'image/*': [], // 이미지 파일 전체를 받음
  });
  return (
    <Dropzone onDrop={onDrop} accept={accept.current} noClick>
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
            <input {...getInputProps()} />
            <ClickZone>
              <SvgWrapper>
                <SvgAddSajin />
              </SvgWrapper>
              <Blank />
              <ButtonWrapper>
                <Button onClick={open}>
                  <SvgPlus height={45} width={45} />
                </Button>
              </ButtonWrapper>
            </ClickZone>
            <ButtonZone>
              <ButtonLeftWrapper>
                <ButtonWrapper>
                  <RoundButton onClick={onClickLicense}>
                    <SvgLicense />
                  </RoundButton>
                </ButtonWrapper>
              </ButtonLeftWrapper>
            </ButtonZone>
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
  height: 100%;
  width: 100%;
`;
const ClickZone = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const ButtonZone = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;
const ButtonWrapper = styled.div`
  z-index: 1;
`;
const ButtonLeftWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`;
const FloatingButton = styled.div`
  z-index: 1;
`;
const SvgWrapper = styled.div`
  svg {
    height: 200px; // 150px
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
  border-radius: 22.5px;
  background-color: #e9ecef;
`;
export default UploadFile;
