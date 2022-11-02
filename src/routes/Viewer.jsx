import { useEffect, useRef, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import NotLoadedFile from 'routes/NotLoadedFile';
import NotFoundPage from 'routes/NotFoundPage';
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
import ImageScreen from 'components/ImageScreen';
import SvgIcon from 'icons/SvgIcon';

const Viewer = () => {
  const [searchParams] = useSearchParams();
  const fileRefId = searchParams.get('i'); // ?id=
  const name = searchParams.get('n'); // &name=
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
  const imageRef = useRef(null);

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
              <ImageScreen src={fileUrl} />
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

export default Viewer;
