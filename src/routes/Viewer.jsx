import deleteFile from 'components/deleteFile';
import loadFile from 'components/loadFile';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isFileDeletedState } from 'components/states';

const Viewer = () => {
  const params = useParams();
  const paramsId = params.id; // docRef.id
  const [fileUrl, setFileUrl] = useState('');
  const [notLoaded, setNotLoaded] = useState(false);
  const [isFileDeleted, setIsFileDeleted] = useRecoilState(isFileDeletedState);

  const onClick = e => {
    e.preventDefault();
    // firestore id
    // storage id
    deleteFile({ fileId: paramsId, setIsFileDeleted });
  };
  useEffect(() => {
    const fileDb = loadFile({ fileId: paramsId }); // Promise
    // data가 null 일때 처리하기
    fileDb
      .then(data => {
        const fileUrl = data.url;
        setFileUrl(fileUrl);
      })
      .catch(err => {
        console.log('Error!', err);
        setNotLoaded(true);
      });
  }, []);
  return (
    // catch 로직 이전에서는 모두 blank 화면이 출력되며, catch 로직 실행 이후 로드 실패 혹은 viewer 화면이 출려된다
    <div>
      {!notLoaded ? (
        !(fileUrl === '') ? (
          !isFileDeleted ? (
            <div>
              <h1>Viewer</h1>
              <button onClick={onClick}>Delete file</button>
              <img src={fileUrl} />
            </div>
          ) : (
            <h1>Deleted!</h1>
          )
        ) : (
          <h1>Blank</h1>
        )
      ) : (
        <div>
          <h1>Not Loaded</h1>
          <p>로드 실패</p>
        </div>
      )}
    </div>
  );
};

export default Viewer;
