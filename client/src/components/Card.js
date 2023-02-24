import styled from 'styled-components';

function Card({ width, height, children }) {
  return (
    <CardContainer width={width} height={height}>
      {children}
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.12);
  width: ${({ width }) => (width ? width : '400px')};
  height: ${({ height }) => (height ? height : '400px')};
`;

export default Card;
