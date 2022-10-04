import { useState } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { storage, ref, uploadBytes, getDownloadURL } from 'components/storage';
import { db, collection, addDoc } from 'components/firestore';
import Viewer from 'components/Viewer';

const Home = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [refName, setRefName] = useState('');

  const filePush = async f => {
    const refName = uuidv4().replace(/-/g, '');
    const storageRef = ref(storage, `${refName}`);
    const metadata = {
      contentType: null,
    };
    uploadBytes(storageRef, f, metadata).then(snapshot => {
      const fileName = storageRef.name;
      getDownloadURL(ref(storage, fileName)).then(async fileUrl => {
        setFileUrl(fileUrl);
        // setFileName(fileName);
        // url을 어떤 hash에 대응해야 하며 이를 접근하여 url 접근가능하게 해야함
        const name = uuidv4().replace(/-/g, '');
        const docRef = await addDoc(collection(db, 'images'), {
          // imageName: fileName,
          // name: name,
          url: fileUrl,
        });
        console.log('Document written with ID: ', docRef.id); // (1) docRef.id이것을 참조하기 때문에 이것을 어떻게 암호화 해서 구성해야함
        // 즉 doc ref id가 url의 해시가 되는 것임!
        setRefName(docRef.id);
      });
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
      {refName != '' ? <Viewer refName={refName} /> : ''}
    </div>
  );
};

const Frame = styled.div`
  height: 200px;
  width: 200px;
  background-color: gray;
`;

export default Home;
