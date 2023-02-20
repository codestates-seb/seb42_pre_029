import styled from 'styled-components';

function Button({ type, text, border, bgColor, textColor, width }) {
  return (
    <>
      <GlobalButton
        type={type}
        width={width}
        border={border}
        bgColor={bgColor}
        textColor={textColor}
      >
        {text}
      </GlobalButton>
    </>
  );
}

const GlobalButton = styled.button`
  width: ${props => props.width};
  height: 3em;
  font-size: 0.86em;
  border: ${({ border }) => (border ? border : null)};
  border-radius: 0.21em;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
`;

export default Button;
