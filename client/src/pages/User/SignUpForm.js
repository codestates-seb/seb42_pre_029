import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../../components/Card';
import InputBox from '../../components/InputBox';
import Button from '../../components/Button';

function SignUpForm() {
  const initialValues = { name: '', email: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const onChange = e => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    setFormErrors(checkValid(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const checkValid = values => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9_-]+\.[a-zA-Z-.]+$/;
    const passwordRegex = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z]).*$/;

    if (!values.name) {
      errors.name = 'Display name cannot be empty.';
    }
    if (!values.email) {
      errors.email = 'Email cannot be empty.';
    } else if (!emailRegex.test(values.email)) {
      errors.email = `${values.email} is not a valid email address.`;
    }
    if (!values.password) {
      errors.password = 'Password cannot be empty.';
    } else if (!passwordRegex.test(values.password)) {
      errors.password = 'Password must have valid password form.';
    }
    return errors;
  };

  return (
    <Card width="400px" height="480px">
      <InputForm onSubmit={onSubmit}>
        <InputBox
          type="text"
          id="name"
          title="Display name"
          value={formValues.name}
          onChange={onChange}
        />
        <ErrorMessage>{formErrors.name}</ErrorMessage>
        <InputBox
          type="text"
          id="email"
          title="Email"
          value={formValues.email}
          onChange={onChange}
        />
        <ErrorMessage>{formErrors.email}</ErrorMessage>
        <InputBox
          type="password"
          id="password"
          title="Password"
          value={formValues.password}
          onChange={onChange}
        />
        <ErrorMessage>{formErrors.password}</ErrorMessage>
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
      </InputForm>
    </Card>
  );
}

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  margin-top: 8px;
  margin-bottom: 16px;
  color: var(--error);
  font-size: var(--font-size-sm);
`;

const Condition = styled.p`
  width: 320px;
  height: 40px;
  margin-bottom: 12px;
  color: var(--black-006);
`;

export default SignUpForm;
