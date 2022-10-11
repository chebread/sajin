import { useState } from 'react';
import UploadFile from 'components/UploadFile';
import pushFile from 'components/pushFile';
import UploadingFile from 'components/UploadingFile';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import styled from 'styled-components';

const Home = () => {
  const [isFile, setIsFile] = useState(false);
  const [fileRefId, setFileRefId] = useState(''); // 이것은 firestore을 접근할 수 있는 id임

  const onDrop = files => {
    // 여기 에러 확인 로직 있어야함
    const file = files[0];
    if (file === undefined) {
      toast.error('This file cannot be uploaded');
      return;
    } else {
      setIsFile(true);
      const fileRefId = pushFile({ file }); // pushFile은 사용자가 제공한 file의 firesotre의 id를 반환함
      fileRefId.then(id => {
        // 파일이 업로드 될때까지 기다린후 비동기적으로 값을 도출함
        // console.log('data ' + id);
        setFileRefId(id); // 이것이 storage id임
        toast.success('File has uploaded');
      });
    }
  };

  return (
    <FullScreen>
      {
        !isFile ? (
          <UploadFile onDrop={onDrop} />
        ) : fileRefId === '' ? (
          <UploadingFile />
        ) : (
          <Navigate to={`i?id=${fileRefId}`} />
        ) // 로드 완료
      }
    </FullScreen>
  );
};
const FullScreen = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

export default Home;
