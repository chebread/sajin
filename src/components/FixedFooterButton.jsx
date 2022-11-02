import { useState } from 'react';
import styled from 'styled-components';
import { useLongPress } from 'use-long-press';

const FixedFooterButton = ({ children, onClick }) => {
  const [isOnMouseAdd, setIsOnMouseAdd] = useState(false);
  const [isOnClickAdd, setIsOnClickAdd] = useState(false);
  const onMouseEnterAdd = () => {
    setIsOnMouseAdd(true);
  };
  const onMouseLeaveAdd = () => {
    setIsOnMouseAdd(false);
  };
  const onClickAdd = useLongPress(() => {}, {
    onStart: () => {
      setIsOnClickAdd(true);
    },
    onFinish: () => {
      setIsOnClickAdd(false);
    },
    threshold: 0,
    captureEvent: false,
    cancelOnMovement: false,
  });

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button
          {...onClickAdd()}
          isOnMouse={isOnMouseAdd}
          isOnClick={isOnClickAdd}
          onMouseEnter={onMouseEnterAdd}
          onMouseLeave={onMouseLeaveAdd}
          onClick={onClick}
        >
          {children}
        </Button>
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
export default FixedFooterButton;
