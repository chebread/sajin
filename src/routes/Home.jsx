import { useState } from 'react';
import Dropzone from 'react-dropzone';
import pushFile from 'components/pushFile';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import getUrl from 'components/getUrl';
import { useRecoilState } from 'recoil';
import { dbRefIdState } from 'components/states';

const Home = () => {
  const navigate = useNavigate();
  const [isFile, setIsFile] = useState(false);
  const [dbRefId, setDbRefId] = useRecoilState(dbRefIdState); // 이것은 firestore을 접근할 수 있는 id임
  const [inputValue, setInputValue] = useState('');

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
  const onChange = e => {
    const {
      target: { value },
    } = e;
    setInputValue(value);
  };
  const onKeyDown = e => {
    const key = e.keyCode;
    if (key === 13) {
      navigate(`i/${inputValue}`);
    }
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
      {
        !isFile ? (
          <div>
            <h1>Home</h1>
            <h2>Search</h2>
            <input type="text" onChange={onChange} onKeyDown={onKeyDown} />
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
        ) : dbRefId === null ? (
          <h1>Uploading</h1> // 아직 파일이 로드 안됨
        ) : (
          <div>
            <h1>Uploaded</h1>
            <p>
              Check out photos uploaded from{' '}
              <Link to={`i/${dbRefId}`}>{getUrl(`i/${dbRefId}`)}</Link>
            </p>
          </div>
        ) // 로드 완료
      }
    </div>
  );
};
const Frame = styled.div`
  height: 200px;
  width: 200px;
  background-color: lightgray;
`;

export default Home;
