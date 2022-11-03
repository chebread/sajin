import styled from 'styled-components';

const FooterButton = ({ children, onClick }) => {
  return (
    <Wrapper>
      <ButtonWrapper>
        <Button onClick={onClick}>{children}</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;
const ButtonWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;
const Button = styled.button`
  all: unset;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 50%; // mobile : clac(100% - 60px)
  min-height: 75px;
  border-radius: 30px;
  background-color: rgba(233, 236, 239, 0.7);
  &:hover {
    background-color: rgba(222, 226, 230, 0.7);
  }
  &:active {
    background-color: rgba(206, 212, 218, 0.7);
  }
  backdrop-filter: blur(18.75px);
  svg {
    height: 45px;
    width: 45px;
  }
  z-index: 1;
  margin: 30px;
`;
export default FooterButton;
