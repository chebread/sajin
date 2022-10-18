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
  const [isError, setIsError] = useState(false);

  const onDrop = async files => {
    if (files.length > 1) {
      // 1개 초과 파일은 받지 않음
      toast.error('Only one file can be uploaded');
      return;
    }
    const file = files[0];
    if (file === undefined) {
      // 이미지 파일 이외의 파일은 받지 않음
      toast.error('This file cannot be uploaded');
      return;
    }
    setIsFile(true);
    // 파일이 업로드 될때까지 기다림
    await pushFile({ file }) // 사용자가 제공한 file의 firesotre의 id를 반환함
      .then(fileRefId => {
        // 서버에서 처리할 시간을 주고 (500초 멈춤) viewer를 출력 (파일을 로드)
        setTimeout(() => {
          setFileRefId(fileRefId); // 이것이 storage id임
          toast.success('File has uploaded');
        }, 500);
      })
      .catch(err => {
        console.log(err, process.env.API_KEY);
        // 서버 에러시 503으로 리다이렉션함 (에러로 인해 파일은 서버에 로드하지 않음)
        setIsError(true);
      });
  };
  return (
    <FullScreen>
      {!isFile ? (
        <UploadFile onDrop={onDrop} />
      ) : fileRefId === '' ? (
        !isError ? (
          <UploadingFile />
        ) : (
          <Navigate to="503" />
        )
      ) : (
        <Navigate to={`i?id=${fileRefId}`} /> // 로드 완료
      )}
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
