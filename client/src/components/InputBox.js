import Label from './Label';
import InputField from './InputField';
import styled from 'styled-components';

function InputBox({ type, id, title, value, onChange }) {
  return (
    <FormContainer>
      <Label id={id}>{title}</Label>
      <InputField type={type} id={id} value={value} onChange={onChange} />
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > label {
    margin-bottom: 8px;
  }
`;

export default InputBox;
