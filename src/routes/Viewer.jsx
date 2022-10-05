import loadFile from 'components/loadFile';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Viewer = () => {
  const params = useParams();
  const paramsId = params.id; // docRef.id
  const [fileUrl, setFileUrl] = useState('');
  const [notLoaded, setNotLoaded] = useState(false);

  useEffect(() => {
    const data = loadFile({ fileId: paramsId }); // Promise
    // data가 null 일때 처리하기
    data
      .then(data => {
        const fileUrl = data.url;
        setFileUrl(fileUrl);
      })
      .catch(err => {
        console.log('Error!');
        setNotLoaded(true);
      });
  }, []);
  return (
    // catch 로직 이전에서는 모두 blank 화면이 출력되며, catch 로직 실행 이후 로드 실패 혹은 viewer 화면이 출려된다
    <div>
      {!notLoaded ? (
        !(fileUrl === '') ? (
          <div>
            <h1>Viewer</h1>
            <img src={fileUrl} />
          </div>
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
