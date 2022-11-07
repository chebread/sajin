import styled from 'styled-components';

import SvgPlus from './SvgPlus';

const SvgXMark = () => {
  return (
    <Right>
      <SvgPlus />
    </Right>
  );
};

const Right = styled.div`
  svg {
    transform: rotate(45deg);
  }
`;

export default SvgXMark;
