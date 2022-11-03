import { useEffect, useRef, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import NotLoadedFile from 'routes/NotLoadedFile';
import NotFoundPage from 'routes/NotFoundPage';
import ImageScreen from 'components/ImageScreen';
import CopyButton from 'components/CopyButton';
import ViewerRoundButton from 'components/ViewerRoundButton';
import HelmetTemplate from 'components/HelmetTemplate';
import getThisUrl from 'lib/getThisUrl';
import deleteFile from 'lib/deleteFile';
import loadFile from 'lib/loadFile';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import SvgShare from 'icons/SvgShare';
import SvgTrash from 'icons/SvgTrash';
import SvgInfo from 'icons/SvgInfo';
import SvgDoubleDownArrow from 'icons/SvgDoubleDownArrow';
import FixedFooterButton from 'components/FixedFooterButton';
import SvgIcon from 'icons/SvgIcon';

const Viewer = () => {
  const [searchParams] = useSearchParams();
  const fileRefId = searchParams.get('i'); // ?id=
  // const name = searchParams.get('n'); // &name=
  // const isName = useRef(name != null ? true : false);
  const isParams = fileRefId === null || fileRefId === '' ? false : true; // blank value는 ?=로 접근될때 발생됨
  const [fileUrl, setFileUrl] = useState('');
  const [notLoaded, setNotLoaded] = useState(false);
  const [isFileDeleted, setIsFileDeleted] = useState(false);
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
  const onCopy = () => {
    toast.success('Copied link to this file');
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
                <BtnWrapper>
                  <BtnWrapper2>
                    <CopyToClipboard text={thisUrl.current} onCopy={onCopy}>
                      <Button>
                        <SvgShare />
                      </Button>
                    </CopyToClipboard>
                    <Button onClick={onClickDelete}>
                      <SvgTrash />
                    </Button>
                  </BtnWrapper2>
                </BtnWrapper>
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
const BtnWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;
const BtnWrapper2 = styled.div`
  position: fixed;
  width: 50%;
  height: auto;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Button = styled.button`
  all: unset;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 100%; // mobile : clac(100% - 60px)
  height: 75px;
  border-radius: 30px;
  background-color: ${({ isOnMouse, isOnClick }) =>
    isOnMouse
      ? isOnClick
        ? 'rgba(206, 212, 218, 0.7)'
        : 'rgba(222, 226, 230, 0.7)'
      : 'rgba(233, 236, 239, 0.7)'};
  backdrop-filter: blur(18.75px);
  svg {
    height: 45px;
    width: 45px;
  }
  margin: 0 30px 30px 0;
  &:last-child {
    margin: 0 0 30px 0;
  }
  z-index: 1;
`;
export default Viewer;
