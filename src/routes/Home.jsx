import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import pushFile from 'components/pushFile';
import styled from 'styled-components';
import Viewer from 'components/Viewer';
import { dbRefIdState } from 'components/states';
import { useRecoilState } from 'recoil';

const Home = () => {
  const [dbRefId, setDbRefId] = useRecoilState(dbRefIdState); // (0) why error? => 항시 컴포넌트 내에서 선언해야 함
  console.log(dbRefId); // ok
  const onDrop = files => {
    // 여기 에러 확인 로직 있어야함
    const file = files[0];
    pushFile({ file, setDbRefId });
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
      {/* {refName != '' ? <Viewer refName={refName} /> : ''} */}
    </div>
  );
};

const Frame = styled.div`
  height: 200px;
  width: 200px;
  background-color: gray;
`;

export default Home;
