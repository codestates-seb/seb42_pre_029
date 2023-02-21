import styled from 'styled-components';

function InputField({ label, placeholder, value, onChange }) {
  return (
    <>
      <label>{label}</label>
      <GlobalInput
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
}

const GlobalInput = styled.input`
  background: none;
  border: 1px solid #ddd;
  border-radius: 3px;
  display: block;
  width: 80%;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 20px;
`;

export default InputField;
