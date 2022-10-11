import styled from 'styled-components';

const Button = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65px;
  width: 65px;
  border-radius: 50%;
  margin: 15px;
  background-color: #212529;
  opacity: 0.8;
  svg {
    height: 42.5px;
    width: 42.5px;
    fill: #f1f3f5;
  }
`;

export default Button;
