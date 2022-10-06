import { useEffect, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import loadFile from 'components/loadFile';
import NotLoadedFile from 'components/NotLoadedFile';
import NotFoundPage from './NotFoundPage';
import deleteFile from 'components/deleteFile';
import CopyButton from 'components/CopyButton';
import Button from 'components/Button';

const Viewer = () => {
  const [searchParams] = useSearchParams();
  const fileRefId = searchParams.get('id');
  const isParams = fileRefId === null || fileRefId === '' ? false : true; // blank value는 ?=로 접근될때 발생됨
  const [fileUrl, setFileUrl] = useState('');
  const [notLoaded, setNotLoaded] = useState(false);
  const [isFileDeleted, setIsFileDeleted] = useState(false);
  const thisUrl = location.href;

  const onClickDelete = e => {
    e.preventDefault();
    // firestore id
    // storage id
    deleteFile({ fileId: fileRefId });
    // deleted 시 바로 home 으로 리다이렉트하기
    setIsFileDeleted(true);
  };
  const onClickCopy = () => {
    console.log('on click');
  };
  useEffect(() => {
    const fileDb = loadFile({ fileId: fileRefId }); // Promise
    // data가 null 일때 처리하기
    fileDb
      .then(data => {
        const fileUrl = data.url;
        setFileUrl(fileUrl);
      })
      .catch(err => {
        // console.log('Error!', err);
        setNotLoaded(true);
      });
  }, []);
  return (
    // catch 로직 이전에서는 모두 blank 화면이 출력되며, catch 로직 실행 이후 로드 실패 혹은 viewer 화면이 출려된다
    <div>
      {isParams ? (
        !notLoaded ? (
          !(fileUrl === '') ? ( // 없는 파일 (잘못된 접근)
            !isFileDeleted ? (
              <div>
                <h1>Viewer</h1>
                <Button onClick={onClickDelete}>Delete file</Button>{' '}
                {/* svg 교체 */}
                <img src={fileUrl} />
                <CopyButton onClick={onClickCopy} url={thisUrl}>
                  Copy this image link
                </CopyButton>{' '}
                {/* svg 교체 */}
              </div>
            ) : (
              <Navigate to="/" /> // redirection
            )
          ) : (
            ''
          )
        ) : (
          <NotLoadedFile />
        )
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
};

export default Viewer;
