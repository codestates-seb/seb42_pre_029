import styled from 'styled-components';

function InputField({
  type,
  label,
  placeholder,
  value,
  onChange,
  width,
  height,
}) {
  return (
    <>
      <label>
        {label}
        <GlobalInput
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          width={width}
          height={height}
        />
      </label>
    </>
  );
}

const GlobalInput = styled.input`
  background: none;
  border: 1px solid var(--line-001);
  border-radius: 3px;
  display: block;
  box-sizing: border-box;
  padding: 8px;
  margin: 8px;
  width: ${({ width }) => width};
  width: ${({ height }) => height};
  font-size: var(--font-size-sm);

  &:focus {
    outline: none;
    box-shadow: 0px 0px 3px 0.5px var(--main-002);
    border-color: none;
  }
`;

export default InputField;
