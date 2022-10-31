import styled from 'styled-components';

const RoundButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65px;
  width: 65px;
  border-radius: 50%;
  background-color: #e9ecef;
  opacity: 0.8;
  margin: 15px;
  svg {
    height: 42.5px;
    width: 42.5px;
    fill: black;
  }
`;

export default RoundButton;
