import SvgLeftArrow from 'icons/SvgLeftArrow';
import SvgRightArrow from 'icons/SvgRightArrow';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RoundButton from './RoundButton';
import ViewerRoundButton from './ViewerRoundButton';
import { useLongPress } from 'use-long-press';
import { useRecoilState } from 'recoil';
import { isGoBackState } from './states';
import SvgHome from 'icons/SvgHome';

const Navigator = ({ mode }) => {
  const navigate = useNavigate();
  const [isLongPress, setIsLongPress] = useState(false);
  const [isGoHome, setIsGoHome] = useRecoilState(isGoBackState);
  const isViewerMode = useRef(mode === 'viewer');
  const isHomeMode = useRef(mode === 'home');

  const onLongPress = useLongPress(
    () => {
      setIsLongPress(true);
    },
    {
      onFinish: () => {
        navigate('/');
        setIsLongPress(false);
        setIsGoHome(true);
      },
      threshold: 250,
      captureEvent: false,
      cancelOnMovement: true,
    }
  );
  const onClickGoBack = () => {
    navigate(-1);
    if (isGoHome) {
      setIsGoHome(false);
    }
  };
  const onClickGoForward = () => {
    navigate(1);
  };
  return (
    <NavigatorWrapper>
      {isHomeMode.current ? (
        isGoHome ? (
          <>
            <ButtonWrapper>
              <RoundButton onClick={onClickGoBack}>
                <SvgLeftArrow />
              </RoundButton>
            </ButtonWrapper>
            <div></div>
          </>
        ) : (
          <>
            <ButtonWrapper>
              <RoundButton onClick={onClickGoBack}>
                <SvgLeftArrow />
              </RoundButton>
            </ButtonWrapper>
            <ButtonWrapper>
              <RoundButton onClick={onClickGoForward}>
                <SvgRightArrow />
              </RoundButton>
            </ButtonWrapper>
          </>
        )
      ) : (
        <>
          <ButtonWrapper>
            <RoundButton {...onLongPress()} onClick={onClickGoBack}>
              {isLongPress ? <SvgHome /> : <SvgLeftArrow />}
            </RoundButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <RoundButton {...onLongPress()} onClick={onClickGoForward}>
              {isLongPress ? <SvgHome /> : <SvgRightArrow />}
            </RoundButton>
          </ButtonWrapper>
        </>
      )}
    </NavigatorWrapper>
  );
};
const NavigatorWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;
const ButtonWrapper = styled.div`
  z-index: 1;
`;
export default Navigator;
