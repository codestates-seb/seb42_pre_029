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
  &:focus {
    outline: none;
    box-shadow: 0px 0px 3px 0.5px var(--main-002);
    border-color: none;
  }
`;

export default TextArea;
