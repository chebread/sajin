import { useState } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';

const Frame = styled.div`
  height: 200px;
  width: 200px;
  background-color: gray;
`;
const Home = () => {
  const [attachment, setAttachment] = useState();

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0];
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = data => {
      const {
        currentTarget: { result },
      } = data;
      setAttachment(result);
      console.log(data);
    };
    reader.readAsDataURL(file);
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
      <img src={attachment} width={300} height={300} />
    </div>
  );
};

export default Home;
