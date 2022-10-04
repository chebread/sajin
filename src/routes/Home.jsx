import { useState } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { storage, ref, uploadBytes } from 'components/storage';

const Frame = styled.div`
  height: 200px;
  width: 200px;
  background-color: gray;
`;
const Home = () => {
  const [fileName, setFileName] = useState('');
  console.log('🚀 ~ file: Home.jsx ~ line 14 ~ Home ~ fileName', fileName);
  const filePush = f => {
    const refName = uuidv4().replace(/-/g, '');
    const storageRef = ref(storage, `${refName}`);
    const metadata = {
      contentType: 'image/avif', // avif로 파일 변환
    };
    uploadBytes(storageRef, f, metadata).then(snapshot => {
      const fileName = storageRef.name;
      setFileName(fileName);
    });
  };
  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0];
    filePush(file);
  };

  const accept = {
    'image/*': [
      '.jpeg',
      '.jpg',
      '.png',
      '.svg',
      '.ico',
      '.gif',
      '.webp',
      '.avif',
    ],
  };
  return (
    <div>
      <h1>Home</h1>
      <Dropzone onDrop={onDrop} noClick accept={accept}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <Frame>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here</p>
              </Frame>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default Home;
