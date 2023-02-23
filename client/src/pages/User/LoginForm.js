import { useState } from 'react';
import styled from 'styled-components';
import Card from '../../components/Card';
import InputBox from '../../components/InputBox';
import Label from '../../components/Label';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

function LoginForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <Card width="400px" height="320px">
      <InputForm onSubmit={onSubmit}>
        <InputBox
          type="email"
          id="email"
          title="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <PasswordContainer>
          <Label id="password">Password</Label>
          <a href="https://stackoverflow.com/">Forgot password?</a>
        </PasswordContainer>
        <InputField
          type="password"
          id="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <Button
          text="Log in"
          width="320px"
          height="40px"
          textColor="white"
          fontSize="var(--font-size-md)"
          fontWeignt="500"
          bgColor="var(--pbtn-default)"
          hover="var(--pbtn-hover)"
          active="var(--pbtn-selected)"
        />
      </InputForm>
    </Card>
  );
}

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > div:first-child {
    margin-bottom: 32px;
  }
  & > input {
    margin-bottom: 32px;
  }
`;

const PasswordContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  & > a {
    color: var(--main-001);
  }
`;

export default LoginForm;
