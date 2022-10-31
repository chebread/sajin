import styled from 'styled-components';
import SvgLeftArrow from 'icons/SvgLeftArrow';

const SvgRightArrow = () => {
  return (
    <Right>
      <SvgLeftArrow />
    </Right>
  );
};

const Right = styled.div`
  svg {
    transform: rotate(180deg);
  }
`;

export default SvgRightArrow;
