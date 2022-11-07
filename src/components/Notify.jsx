import styled from 'styled-components';

const Notify = ({ children }) => {
  return (
    // 이것을 배열의 수 만큼 생성하자
    <Wrapper>
      <FooterWrapper>
        <ButtonWrapper>
          <Button>Copied link to this file</Button>
        </ButtonWrapper>
      </FooterWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;
const FooterWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  position: fixed;
  min-width: 50%;
  @media (max-width: 800px) {
    min-width: calc(100% - 60px);
  }
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 30px;
  z-index: 2;
`;
const Button = styled.button`
  all: unset;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 75px;
  min-width: 100%; // min-width시 꽉차게 된다!
  border-radius: 30px;
  background-color: rgba(178, 242, 187, 65%);
  &:hover {
    background-color: rgba(140, 233, 154, 65%);
  }
  &:active {
    background-color: rgba(105, 219, 124, 65%);
  }
  /* background-color: rgb(255, 201, 201, 65%);
  &:hover {
    background-color: rgb(255, 168, 168, 65%);
  }
  &:active {
    background-color: rgb(255, 135, 135, 65%);
  } */
  backdrop-filter: blur(18.75px);
  margin: 0 30px 15px 0;
  &:last-child {
    margin: 0;
  }
  z-index: 1;
  font-size: 20px;
  font-weight: 700;
  @media (max-width: 800px) {
    font-size: 18px;
    font-weight: 600;
  }
`;
export default Notify;
