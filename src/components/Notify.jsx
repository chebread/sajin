import { useState } from 'react';
import styled from 'styled-components';

const Notify = ({ children }) => {
  const [isMarked, setIsMarked] = useState(false);
  const [isOnMouseAdd, setIsOnMouseAdd] = useState(false);

  const onMouseEnterAdd = () => {
    setIsOnMouseAdd(true);
  };
  const onMouseLeaveAdd = () => {
    setIsOnMouseAdd(false);
  };
  const onClickNotify = () => {};
  return isMarked ? (
    <Wrapper>
      <ButtonWrapper>
        <Button
          isOnMouse={isOnMouseAdd}
          onMouseEnter={onMouseEnterAdd}
          onMouseLeave={onMouseLeaveAdd}
          onClick={onClickNotify}
        >
          {children}
        </Button>
      </ButtonWrapper>
    </Wrapper>
  ) : (
    ''
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
  width: 50%; // mobile : clac(100% - 60px)
  height: 75px;
  border-radius: 30px;
  background-color: ${({ isOnMouse, isOnClick }) =>
    isOnMouse
      ? isOnClick
        ? 'rgba(206, 212, 218, 0.7)'
        : 'rgba(222, 226, 230, 0.7)'
      : 'rgba(233, 236, 239, 0.7)'};
  backdrop-filter: blur(18.75px);
  svg {
    height: 45px;
    width: 45px;
  }
  z-index: 1;
  margin: 30px;
`;
export default Notify;
