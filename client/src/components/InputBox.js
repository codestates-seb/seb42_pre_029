import { useState } from 'react';
import InputField from './InputField';

function InputBox() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = event => setEmail(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  return (
    <div>
      <InputField
        label="Email"
        value={email}
        onChange={handleEmailChange}
        placeholder="your email?"
      />
      <InputField
        label="Password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="your password?"
      />
    </div>
  );
}

export default InputBox;
