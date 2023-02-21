import styled from 'styled-components';

function Button({ type, text, border, bgColor, textColor, hover, selected }) {
  return (
    <>
      <GlobalButton
        type={type}
        border={border}
        bgColor={bgColor}
        textColor={textColor}
        hover={hover}
        selected={selected}
      >
        {text}
      </GlobalButton>
    </>
  );
}

const GlobalButton = styled.button`
  height: 3em;
  font-size: 0.86em;
  padding: 0.7em 1.2em;
  border: ${({ border }) => (border ? border : null)};
  border-radius: 0.21em;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  :active {
    background-color: ${({ selected }) => selected};
  }
  :hover {
    background-color: ${({ hover }) => hover};
  }
`;

export default Button;
