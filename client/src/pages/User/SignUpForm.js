import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, reset } from '../../features/auth/authSlice';
import styled from 'styled-components';
import Card from '../../components/Card';
import InputBox from '../../components/InputBox';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

function SignUpForm() {
  const initialValues = { username: '', email: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({
    error: 'Data cannot be empty.',
  });
  const { username, email, password } = formValues;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth,
  );

  const onChange = e => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
    setFormErrors(checkValid({ ...formValues, [id]: value }));
  };

  const onSubmit = e => {
    e.preventDefault();
    setFormErrors(checkValid(formValues));

    const userData = {
      email,
      username,
      password,
    };

    if (Object.keys(formErrors).length === 0) {
      dispatch(signup(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess || user) {
      navigate('/login');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  const checkValid = values => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9_-]+\.[a-zA-Z-.]+$/;
    const passwordRegex = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z]).*$/;

    if (!values.username) {
      errors.username = 'Display name cannot be empty.';
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
          id="username"
          title="Display name"
          value={username}
          onChange={onChange}
        />
        <ErrorMessage>{formErrors.username}</ErrorMessage>
        <InputBox
          type="text"
          id="email"
          title="Email"
          value={email}
          onChange={onChange}
        />
        <ErrorMessage>{formErrors.email}</ErrorMessage>
        <InputBox
          type="password"
          id="password"
          title="Password"
          value={password}
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
