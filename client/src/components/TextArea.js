import styled from 'styled-components';

function TextArea({ label, placeholder, value, onChange }) {
  return (
    <TextAreaContainer>
      <label>{label}</label>
      <textarea placeholder={placeholder} value={value} onChange={onChange} />
    </TextAreaContainer>
  );
}

const TextAreaContainer = styled.div`
  margin: 20px;
`;

export default TextArea;
