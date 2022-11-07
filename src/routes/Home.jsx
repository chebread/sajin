import { useState } from 'react';
import HomeScreen from 'routes/HomeScreen';
import Uploading from 'routes/Uploading';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import uploadFile from 'lib/uploadFile';

const Home = () => {
  const [isFile, setIsFile] = useState(false);
  const [fileId, setFileId] = useState(null);
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
    console.log(1);
    await uploadFile({ file })
      .then(fileId => {
        setFileId(fileId);
        toast.success('File has uploaded');
        // setTimeOut ... 500ms
      })
      .catch(() => {
        setIsError(true);
      });
  };
  const onClickCancle = () => {
    setIsFile(false); // home으로 돌아옴
  };

  return !isFile ? (
    <>
      <HomeScreen onDrop={onDrop} />
    </>
  ) : fileId === null ? (
    !isError ? (
      <Uploading onClick={onClickCancle} />
    ) : (
      <Navigate to="/" />
    )
  ) : (
    <Navigate to={`i?q=${fileId}`} /> // 로드 완료
  );
};

export default Home;
