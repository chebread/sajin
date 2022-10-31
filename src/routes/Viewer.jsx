import { useEffect, useRef, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import loadFile from 'components/loadFile';
import NotLoadedFile from 'routes/NotLoadedFile';
import NotFoundPage from './NotFoundPage';
import deleteFile from 'components/deleteFile';
import CopyButton from 'components/CopyButton';
import ViewerRoundButton from 'components/ViewerRoundButton';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import base64Encoder from 'components/base64Encoder';
import base64Decoder from 'components/base64Decoder';
import SvgShare from 'icons/SvgShare';
import SvgTrash from 'icons/SvgTrash';
import SvgInfo from 'icons/SvgInfo';
import HelmetTemplate from 'components/HelmetTemplate';
import getThisUrl from 'components/getThisUrl';

const Viewer = () => {
  const [searchParams] = useSearchParams();
  const fileRefId = searchParams.get('id'); // ?id=
  const name = searchParams.get('name'); // &name=
  const isName = useRef(name != null ? true : false);
  const isParams = fileRefId === null || fileRefId === '' ? false : true; // blank value는 ?=로 접근될때 발생됨
  const [fileUrl, setFileUrl] = useState('');
  const [notLoaded, setNotLoaded] = useState(false);
  const [isFileDeleted, setIsFileDeleted] = useState(false);
  const [isOnMouseInfo, setIsOnMouse] = useState(false);
  const [isOnClickInfo, setIsOnClickInfo] = useState(false);
  const thisUrl = useRef(getThisUrl());
  const seoContent = useRef({
    title: 'Images shared on Sajin',
    desc: 'This link is a link to a photo shared on Sajin, Click this link to view photos shared with Sajin',
  });

  useEffect(() => {
    const getFileUrl = async () => {
      const fileDb = await loadFile({ fileId: fileRefId });
      const fileUrl = fileDb.url;
      setFileUrl(fileUrl);
    };
    getFileUrl().catch(err => {
      setNotLoaded(true); // Error (찾을 수 없는 파일...)일때 NotLoadedFile 뜨게 함
    });
  }, []);

  const onClickDelete = async () => {
    await deleteFile({ fileId: fileRefId });
    setIsFileDeleted(true);
    toast.success('This file has been deleted');
  };
  const onMouseEnterInfo = () => {
    setIsOnMouse(true);
    console.log('enter');
  };
  const onMouseLeaveInfo = () => {
    setIsOnMouse(false);
    console.log('leave');
  };
  const onClickInfo = () => {
    console.log('click');
    setIsOnClickInfo(true);
  };
  return (
    // try..catch 로직 이전에서는 모두 blank 화면이 출력되며, try...catch 로직 실행 이후 로드 실패 혹은 viewer 화면이 출려된다
    isParams ? (
      !notLoaded ? (
        !(fileUrl === '') ? ( // 없는 파일 (잘못된 접근)
          !isFileDeleted ? (
            <>
              <HelmetTemplate
                title={seoContent.current.title}
                desc={seoContent.current.desc}
              />
              <FullSizeFrame>
                <ButtonsWrapper>
                  <ButtonLeftWrapper>
                    <ButtonWrapper>
                      <CopyButton url={thisUrl.current}>
                        <SvgShare />
                      </CopyButton>
                      <TrashButton onClick={onClickDelete}>
                        <SvgTrash />
                      </TrashButton>
                    </ButtonWrapper>
                  </ButtonLeftWrapper>
                  <ButtonRightWrapper>
                    <InfoFrame>
                      <InfoContent>hello</InfoContent>
                      <InfoButton
                        onMouseEnter={onMouseEnterInfo}
                        onMouseLeave={onMouseLeaveInfo}
                        onClick={onClickInfo}
                      >
                        <SvgInfo />
                      </InfoButton>
                    </InfoFrame>
                  </ButtonRightWrapper>
                </ButtonsWrapper>
                <ImageWrapper>
                  <Image src={fileUrl} />
                </ImageWrapper>
              </FullSizeFrame>
            </>
          ) : (
            <Navigate to="/" /> // 삭제후 바로 리다렉션
          )
        ) : (
          '' // 로딩시는 빈화면
        )
      ) : (
        <NotLoadedFile /> // 파일이 없음
      )
    ) : (
      <NotFoundPage /> // parameter가 제공되지 않을시
    )
  );
};
const InfoFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 15px;
  z-index: 1;
`;
const InfoContent = styled.div`
  font-size: 16px;
`;
const InfoButton = styled.div`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65px;
  width: 65px;
  border-radius: 50%;
  background-color: #212529;
  opacity: 0.8;
  svg {
    height: 42.5px;
    width: 42.5px;
    fill: #f1f3f5;
  }
`;
const FullSizeFrame = styled.div`
  position: relative;
  background-color: black;
  height: 100%;
  width: 100%;
`;
const ButtonsWrapper = styled.div`
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
const ButtonRightWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;
const TrashButton = styled(ViewerRoundButton)`
  svg {
    fill: #e03131;
  }
`;
const ImageWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const Image = styled.img`
  display: block;
  height: 100%;
  width: auto;
`;
export default Viewer;
