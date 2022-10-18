import { useEffect, useRef, useState } from 'react';
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
  // const name = searchParams.get('name'); // &name=
  const isParams = fileRefId === null || fileRefId === '' ? false : true; // blank value는 ?=로 접근될때 발생됨
  const [fileUrl, setFileUrl] = useState('');
  const [notLoaded, setNotLoaded] = useState(false);
  const [isFileDeleted, setIsFileDeleted] = useState(false);
  const thisUrl = location.href;

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
