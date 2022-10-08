import { useState } from 'react';
import UploadFile from 'components/UploadFile';
import UploadedFile from 'components/UploadedFile';
import pushFile from 'components/pushFile';
import { useRecoilState } from 'recoil';
import { dbRefIdState } from 'components/states';
import UploadingFile from 'components/UploadingFile';

const Home = () => {
  // -- test code!!! //
  const [isFile, setIsFile] = useState(false); // original: false
  const [dbRefId, setDbRefId] = useRecoilState(dbRefIdState); // 이것은 firestore을 접근할 수 있는 id임

  const onDrop = files => {
    // 여기 에러 확인 로직 있어야함
    const file = files[0];
    const dbRefId = pushFile({ file }); // pushFile은 dbRefId를 반환함
    dbRefId.then(id => {
      // console.log('data ' + id);
      setDbRefId(id); // 이것이 storage id임
    });
    setIsFile(true);
  };

  return (
    <div>
      {
        !isFile ? (
          <div>
            <h1>Home</h1>
            <UploadFile onDrop={onDrop} />
          </div>
        ) : dbRefId === null ? (
          <UploadingFile />
        ) : (
          <UploadedFile imageId={dbRefId} />
        ) // 로드 완료
      }
    </div>
  );
};
export default Home;
