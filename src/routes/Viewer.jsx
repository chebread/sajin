import { useEffect, useRef, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import NotLoadedFile from 'routes/NotLoadedFile';
import NotFoundPage from 'routes/NotFoundPage';
import ImageScreen from 'components/ImageScreen';
import HelmetTemplate from 'components/HelmetTemplate';
import getThisUrl from 'lib/getThisUrl';
import deleteFile from 'lib/deleteFile';
import loadFile from 'lib/loadFile';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import SvgShare from 'icons/SvgShare';
import SvgTrash from 'icons/SvgTrash';
import SvgDot from 'icons/SvgDot';

const Viewer = () => {
  const [searchParams] = useSearchParams();
  const fileId = searchParams.get('q'); // ?query=
  const isParams = fileId === null || fileId === '' ? false : true; // blank value는 ?=로 접근될때 발생됨
  const [fileUrl, setFileUrl] = useState('');
  const [notLoaded, setNotLoaded] = useState(false);
  const [isFileDeleted, setIsFileDeleted] = useState(false);
  const thisUrl = useRef(getThisUrl());
  const seoContent = useRef({
    title: 'Images shared on Sajin',
    desc: 'This link is a link to a photo shared on Sajin, Click this link to view photos shared with Sajin',
  });
  const buttonRef = useRef(null);

  useEffect(() => {
    const getFileUrl = async () => {
      const fileDb = await loadFile({ fileId });
      const fileUrl = fileDb.url;
      setFileUrl(fileUrl);
    };
    getFileUrl().catch(err => {
      setNotLoaded(true); // Error (찾을 수 없는 파일...)일때 NotLoadedFile 뜨게 함
    });
  }, []);

  const onClickDelete = () => {
    deleteFile({ fileId });
    setIsFileDeleted(true);
    toast.success('This file has been deleted');
  };
  const onCopy = () => {
    toast.success('Copied link to this file');
  };

  const onScroll = e => {
    console.log(buttonRef.current.scrollLeft, buttonRef.current.innerWidth);
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
              <ImageScreen src={fileUrl} />
              <Wrapper>
                <FooterWrapper>
                  <ButtonWrapper onScroll={onScroll} ref={buttonRef}>
                    <CopyToClipboard text={thisUrl.current} onCopy={onCopy}>
                      <Button>
                        <SvgShare />
                      </Button>
                    </CopyToClipboard>
                    <TrashButton onClick={onClickDelete}>
                      <SvgTrash />
                    </TrashButton>
                  </ButtonWrapper>
                </FooterWrapper>
              </Wrapper>
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
const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;
const FooterWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  position: fixed;
  min-width: 50%;
  @media (max-width: 800px) {
    min-width: calc(100% - 60px);
  }
  height: auto;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  margin: 30px;
`;
const Button = styled.button`
  all: unset;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 75px;
  min-width: 100%; // min-width시 꽉차게 된다!
  border-radius: 30px;
  background-color: rgba(22, 19, 14, 65%);
  &:hover {
    background-color: rgba(33, 29, 25, 65%);
  }
  &:active {
    background-color: rgba(49, 43, 37, 65%);
  }
  backdrop-filter: blur(18.75px);
  svg {
    height: 45px;
    width: 45px;
    fill: rgb(255, 255, 255);
  }
  margin: 0 30px 0 0;
  &:last-child {
    margin: 0;
  }
  z-index: 1;
`;
const TrashButton = styled(Button)`
  svg {
    fill: rgb(224, 49, 49);
  }
`;
export default Viewer;
