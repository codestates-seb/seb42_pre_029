import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../../features/auth/authSlice';
import styled from 'styled-components';
import Card from '../../components/Card';
import InputBox from '../../components/InputBox';
import Label from '../../components/Label';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

function LoginForm() {
  const initialValues = { username: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  const { username, password } = formValues;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth,
  );

  const onChange = e => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    setFormErrors(checkValid(formValues));
    // setIsSubmit(true);

    const userData = {
      username,
      password,
    };

    console.log(userData);
    dispatch(login(userData));
  };

  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // }, [formErrors]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  const checkValid = values => {
    const errors = {};
    const usernameRegex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9_-]+\.[a-zA-Z-.]+$/;
    const passwordRegex = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z]).*$/;

    if (!values.username) {
      errors.username = 'Email cannot be empty.';
    } else if (!usernameRegex.test(values.username)) {
      errors.username = 'The email is not a valid email address.';
    }
    if (!values.password) {
      errors.password = 'Password cannot be empty.';
    } else if (!passwordRegex.test(values.password)) {
      errors.password = 'Password must have valid password form.';
    }
    return errors;
  };

  return (
    <Card width="400px" height="320px">
      <InputForm onSubmit={onSubmit}>
        <InputBox
          type="text"
          id="username"
          title="Email"
          value={formValues.username}
          onChange={onChange}
        />
        <ErrorMessage>{formErrors.username}</ErrorMessage>
        <PasswordContainer>
          <Label id="password">Password</Label>
          <a href="https://stackoverflow.com/">Forgot password?</a>
        </PasswordContainer>
        <InputField
          type="password"
          id="password"
          value={formValues.password}
          onChange={onChange}
        />
        <ErrorMessage>{formErrors.password}</ErrorMessage>
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
  & input {
    margin-bottom: 4px;
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

const ErrorMessage = styled.p`
  margin-top: 8px;
  margin-bottom: 16px;
  color: var(--error);
  font-size: var(--font-size-sm);
`;

export default LoginForm;
