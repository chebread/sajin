import { useState } from 'react';
import UploadFile from 'routes/UploadFile';
import pushFile from 'lib/pushFile';
import UploadingFile from 'routes/UploadingFile';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { fileDbIdRefState, fileIdRefState } from 'states/refStates';

const Home = () => {
  const [isFile, setIsFile] = useState(false);
  const [fileRefId, setFileRefId] = useRecoilState(fileIdRefState); // 이것은 firestore을 접근할 수 있는 id임
  const [fileDbIdRef, setFileDbIdRef] = useRecoilState(fileDbIdRefState); // 이것은 storage를 접근할 수 있는 id임
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
    // (0): Home에서 push file 및 push db 하기
    await pushFile({ file }) // 사용자가 제공한 file의 firesotre의 id를 반환함
      .then(fileRefId => {
        // 서버에서 처리할 시간을 주고 (500초 멈춤) viewer를 출력 (파일을 로드)
        setTimeout(() => {
          setFileRefId(fileRefId); // 이것이 storage id임
          toast.success('File has uploaded');
        }, 500);
      })
      .catch(err => {
        console.log(err);
        setIsError(true);
      });
  };
  return !isFile ? (
    <>
      <UploadFile onDrop={onDrop} />
    </>
  ) : fileRefId === null ? (
    !isError ? (
      <UploadingFile />
    ) : (
      <Navigate to="/" />
    )
  ) : (
    <Navigate to={`i?i=${fileRefId}`} /> // 로드 완료
  );
};

export default Home;
