import { useState } from 'react';
import styled from 'styled-components';
import { useLongPress } from 'use-long-press';

const FixedFooterButton = ({ children, onClick }) => {
  const [isOnMouseAdd, setIsOnMouseAdd] = useState(false);
  const [isOnClickAdd, setIsOnClickAdd] = useState(false);

  const onMouseEnterAdd = () => {
    console.log('enter');
    setIsOnMouseAdd(true);
  };
  const onMouseLeaveAdd = () => {
    console.log('end');
    setIsOnMouseAdd(false);
  };
  const onClickAdd = useLongPress(() => {}, {
    onStart: () => {
      console.log('on start');
      setIsOnClickAdd(true);
    },
    onFinish: () => {
      console.log('on end');
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
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;
const Button = styled.button`
  all: unset;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%; // mobile : 100%
  height: 75px;
  border-radius: 30px;
  background-color: ${({ isOnMouse, isOnClick }) =>
    isOnMouse
      ? isOnClick
        ? '#ced4da'
        : 'rgba(222, 226, 230, 0.7)'
      : 'rgba(233, 236, 239, 0.7)}'};
  margin: 30px;
  svg {
    height: 45px;
    width: 45px;
  }
  z-index: 1;
`;
export default FixedFooterButton;
