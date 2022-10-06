import Dropzone from 'react-dropzone';
import styled from 'styled-components';

const UploadFile = ({ onDrop }) => {
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
  );
};
const Frame = styled.div`
  height: 200px;
  width: 200px;
  background-color: lightgray;
`;

export default UploadFile;
