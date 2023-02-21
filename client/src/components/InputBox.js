import { useState } from 'react';
import InputField from './InputField';
import styled from 'styled-components';

function InputBox() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = event => setEmail(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  return (
    <FormContainer>
      <InputField
        type="text"
        label="Email"
        value={email}
        onChange={handleEmailChange}
        placeholder="your email?"
      />
      <InputField
        type="password"
        label="Password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="your password?"
      />
    </FormContainer>
  );
}

const FormContainer = styled.div`
  background: none;
  border: 1px solid var(--line-003);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 400px;
  height: 323px;
  margin: 20px;
`;

export default InputBox;
