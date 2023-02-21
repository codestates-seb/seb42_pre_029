import styled from 'styled-components';

function Button({
  type,
  text,
  border,
  bgColor,
  textColor,
  hover,
  active,
  height,
  width,
  fontSize,
  padding,
}) {
  return (
    <>
      <GlobalButton
        type={type}
        border={border}
        bgColor={bgColor}
        textColor={textColor}
        hover={hover}
        active={active}
        height={height}
        width={width}
        fontSize={fontSize}
        padding={padding}
      >
        {text}
      </GlobalButton>
    </>
  );
}

const GlobalButton = styled.button`
  height: ${({ height }) => (height ? height : '32px')};
  width: ${({ width }) => (width ? width : 'auto')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 'var(--font-size-sm)')};
  padding: ${({ padding }) => (padding ? padding : 'auto')};
  border: ${({ border }) => (border ? border : null)};
  border-radius: 3px;
  background-color: ${({ bgColor }) =>
    bgColor ? bgColor : 'var(--btn-default)'};
  color: ${({ textColor }) => (textColor ? textColor : 'var(--black-002)')};
  :hover {
    background-color: ${({ hover }) => (hover ? hover : 'var(--btn-hover)')};
  }
  :active {
    background-color: ${({ active }) =>
      active ? active : 'var(--btn-selected)'};
  }
`;

export default Button;
