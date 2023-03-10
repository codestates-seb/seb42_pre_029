import styled from 'styled-components';

function TextArea({
  label,
  placeholder,
  value,
  onChange,
  width,
  height,
  border,
  margin,
  padding,
  borderRadius,
  fontSize,
  fontColor,
}) {
  return (
    <>
      <label>
        {label}
        <GlobalTextArea
          border={border}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          width={width}
          height={height}
          margin={margin}
          padding={padding}
          borderRadius={borderRadius}
          fontSize={fontSize}
          fontColor={fontColor}
        />
      </label>
    </>
  );
}

const GlobalTextArea = styled.textarea`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => (margin ? margin : null)};
  border: ${({ border }) => (border ? border : null)};
  padding: ${({ padding }) => (padding ? padding : 0)};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : 0)};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 'var(--font-size-md)')};
  color: ${({ fontColor }) => (fontColor ? fontColor : 'var(--black-002)')};
  font-family: 'pretendard';
  resize: none;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 3px 0.5px var(--main-002);
    border-color: none;
    color: var(--black-002);
    font-family: 'pretendard';
    font-size: var(--font-size-md);
  }
  &::placeholder {
    color: ${({ placeholder }) => (placeholder ? 'var(--black-005)' : null)};
    font-family: ${({ placeholder }) => (placeholder ? 'pretendard' : null)};
    font-size: ${({ placeholder }) =>
      placeholder ? 'var(--font-size-md)' : null};
  }
`;

export default TextArea;
