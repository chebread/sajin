import styled from 'styled-components';

const ImageScreen = ({ src }) => {
  return (
    <ImageWrapper>
      <Image src={src} />
    </ImageWrapper>
  );
};
const ImageWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: black;
`;
const Image = styled.img`
  display: block;
  max-height: 100%; // max-height 해야지만 처음에 object-fit이 맞춰지게 됨!
  max-width: 100%;
  object-fit: contain;
  object-position: center;
  /* z-index: 1; */
`;
export default ImageScreen;
