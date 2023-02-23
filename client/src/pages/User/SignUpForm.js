import { useState } from 'react';
import styled from 'styled-components';
import Card from '../../components/Card';
import InputBox from '../../components/InputBox';
import Button from '../../components/Button';

function SignUpForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <Card width="400px" height="480px">
      <InputForm onSubmit={onSubmit}>
        <InputBox
          type="text"
          id="name"
          title="Display name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <InputBox
          type="email"
          id="email"
          title="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <InputBox
          type="password"
          id="password"
          title="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
      </InputForm>
      <Condition>
        Passwords must contain at least eight characters, including at least 1
        letter and 1 number.
      </Condition>
      <Button
        text="Sign up"
        width="320px"
        height="40px"
        textColor="white"
        fontSize="var(--font-size-md)"
        fontWeignt="500"
        bgColor="var(--pbtn-default)"
        hover="var(--pbtn-hover)"
        active="var(--pbtn-selected)"
      />
    </Card>
  );
}

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > div {
    margin-bottom: 32px;
  }
  & > div:last-child {
    margin-bottom: 16px;
  }
`;

const Condition = styled.p`
  width: 320px;
  height: 40px;
  margin-bottom: 24px;
  color: var(--black-006);
`;

export default SignUpForm;
