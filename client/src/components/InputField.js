import styled from 'styled-components';

function InputField({ type, id, placeholder, value, onChange, width, height }) {
  return (
    <GlobalInput
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      width={width}
      height={height}
    />
  );
}

const GlobalInput = styled.input`
  border: 1px solid var(--line-001);
  border-radius: 3px;
  padding: 8px;
  width: ${({ width }) => (width ? width : '320px')};
  height: ${({ height }) => (height ? height : '40px')};

  &:focus {
    outline: none;
    border-color: var(--main-002);
    box-shadow: 0px 0px 1px 3px var(--main-003);
  }
`;

export default InputField;
