import { useEffect, useState } from 'react';
import { useSearchParams, Navigate, useNavigate } from 'react-router-dom';
import loadFile from 'components/loadFile';
import NotLoadedFile from 'components/NotLoadedFile';
import NotFoundPage from './NotFoundPage';
import deleteFile from 'components/deleteFile';
import CopyButton from 'components/CopyButton';
import Button from 'components/Button';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import SvgLeftArrow from 'icons/SvgLeftArrow';
import SvgShare from 'icons/SvgShare';
import SvgTrash from 'icons/SvgTrash';

const Viewer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fileRefId = searchParams.get('id'); // ?id=
  const name = searchParams.get('name'); // &name=
  const isParams = fileRefId === null || fileRefId === '' ? false : true; // blank value는 ?=로 접근될때 발생됨
  const [fileUrl, setFileUrl] = useState('');
  const [notLoaded, setNotLoaded] = useState(false);
  const [isFileDeleted, setIsFileDeleted] = useState(false);
  const thisUrl = location.href;

  const onClickDelete = () => {
    // 알림 발생하기
    // firestore id
    // storage id
    deleteFile({ fileId: fileRefId });
    setIsFileDeleted(true);
    // 삭제 알림 요청하기
    toast.success('This file has been deleted');
  };
  // const onClickCopy = () => {
  //   // 알림 발생하기
  //   toast.success('Copied link to this file');
  // };
  const onClickRedirect = () => navigate('/');

  useEffect(() => {
    const fileDb = loadFile({ fileId: fileRefId }); // Promise
    // data가 null 일때 처리하기
    fileDb
      .then(data => {
        console.log(data, fileDb, fileRefId);
        const fileUrl = data.url;
        setFileUrl(fileUrl);
      })
      .catch(err => {
        console.log(err);
        // console.log('Error!', err);
        setNotLoaded(true);
      });
  }, []);

  return (
    // try..catch 로직 이전에서는 모두 blank 화면이 출력되며, try...catch 로직 실행 이후 로드 실패 혹은 viewer 화면이 출려된다
    isParams ? (
      !notLoaded ? (
        !(fileUrl === '') ? ( // 없는 파일 (잘못된 접근)
          !isFileDeleted ? (
            <FullSizeFrame>
              <ButtonsWrapper>
                <div>
                  <Button onClick={onClickRedirect}>
                    <SvgLeftArrow />
                  </Button>
                </div>
                <div>
                  <CopyButton url={thisUrl}>
                    <SvgShare />
                  </CopyButton>
                  <Button onClick={onClickDelete}>
                    <TrashBtnWrapper>
                      <SvgTrash />
                    </TrashBtnWrapper>
                  </Button>
                </div>
              </ButtonsWrapper>
              <ImageWrapper>
                <Image src={fileUrl} />
              </ImageWrapper>
            </FullSizeFrame>
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
const ButtonsWrapper = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  height: 100%;
  width: auto;
  display: block;
`;
export default Viewer;
