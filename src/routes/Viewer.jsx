import { useEffect, useRef, useState } from 'react';
import { useSearchParams, Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import loadFile from 'components/loadFile';
import NotLoadedFile from 'components/NotLoadedFile';
import NotFoundPage from './NotFoundPage';
import deleteFile from 'components/deleteFile';
import CopyButton from 'components/CopyButton';
import Button from 'components/Button';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import base64Encoder from 'components/base64Encoder';
import base64Decoder from 'components/base64Decoder';
import SvgLeftArrow from 'icons/SvgLeftArrow';
import SvgShare from 'icons/SvgShare';
import SvgTrash from 'icons/SvgTrash';
import SvgInfo from 'icons/SvgInfo';

const Viewer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fileRefId = searchParams.get('id'); // ?id=
  const name = searchParams.get('name'); // &name=
  const isName = useRef(name != null ? true : false);
  const isParams = fileRefId === null || fileRefId === '' ? false : true; // blank value는 ?=로 접근될때 발생됨
  const [fileUrl, setFileUrl] = useState('');
  const [notLoaded, setNotLoaded] = useState(false);
  const [isFileDeleted, setIsFileDeleted] = useState(false);
  const thisUrl = window.location.href;
  const seoContent = {
    title: 'Images shared on Sajin.',
    url: thisUrl,
    description:
      'This link is a link to a photo shared on Sajin. Click this link to view photos shared with Sajin.',
  };
  const [isOnMouse, setIsOnMouse] = useState(false);

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
  const onClickRedirect = () => navigate('/');
  const onMouseEnterInfo = () => {
    setIsOnMouse(true);
  };
  const onMouseLeaveInfo = () => {
    setIsOnMouse(false);
  };
  return (
    // try..catch 로직 이전에서는 모두 blank 화면이 출력되며, try...catch 로직 실행 이후 로드 실패 혹은 viewer 화면이 출려된다
    isParams ? (
      !notLoaded ? (
        !(fileUrl === '') ? ( // 없는 파일 (잘못된 접근)
          !isFileDeleted ? (
            <>
              <Helmet>
                <title>{seoContent.title}</title>
                <meta name="description" content={seoContent.description} />
                <link rel="canonical" href={seoContent.url} />
                <meta property="og:url" content={seoContent.url} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={seoContent.title} />
                <meta
                  property="og:description"
                  content={seoContent.description}
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={seoContent.title} />
                <meta
                  name="twitter:description"
                  content={seoContent.description}
                />
              </Helmet>
              <FullSizeFrame>
                <ButtonWrapper>
                  <ButtonLeftWrapper>
                    <FloatingButton>
                      <Button
                        onClick={onClickRedirect}
                        onMouseDown={() => console.log('down')}
                        onMouseUp={() => console.log('up')}
                      >
                        <SvgLeftArrow />
                      </Button>
                    </FloatingButton>
                    <FloatingButton>
                      <CopyButton url={thisUrl}>
                        <SvgShare />
                      </CopyButton>
                      <Button onClick={onClickDelete}>
                        <TrashBtnWrapper>
                          <SvgTrash />
                        </TrashBtnWrapper>
                      </Button>
                    </FloatingButton>
                  </ButtonLeftWrapper>
                  <ButtonRightWrapper>
                    <FloatingButton>
                      <Button
                        onMouseEnter={onMouseEnterInfo}
                        onMouseLeave={onMouseLeaveInfo}
                      >
                        <SvgInfo />
                      </Button>
                    </FloatingButton>
                  </ButtonRightWrapper>
                </ButtonWrapper>
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
const FullSizeFrame = styled.div`
  position: relative;
  background-color: black;
  height: 100%;
  width: 100%;
`;
const ButtonWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;
const ButtonLeftWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
const FloatingButton = styled.div`
  z-index: 1;
`;
const TrashBtnWrapper = styled.div`
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
