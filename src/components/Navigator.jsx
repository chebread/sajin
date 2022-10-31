import SvgLeftArrow from 'icons/SvgLeftArrow';
import SvgRightArrow from 'icons/SvgRightArrow';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RoundButton from './RoundButton';

const Navigator = ({ mode }) => {
  const navigate = useNavigate();

  const onClickGoBack = () => {
    navigate(-1);
  };
  const onClickGoForward = () => {
    navigate(1);
  };
  return (
    <NavigatorWrapper>
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
