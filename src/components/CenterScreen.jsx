import styled from 'styled-components';

const CenterScreen = styled.div`
  position: ${({ position }) => position};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 1;
`;
export default CenterScreen;
