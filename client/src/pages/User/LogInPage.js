import { Link } from 'react-router-dom';
import styled from 'styled-components';
import iconLogo from '../../assets/iconLogo.svg';
import MainLayout from '../../components/MainLayout';
import LoginForm from './LoginForm';

function LogIn() {
  return (
    <MainLayout>
      <FormContainer>
        <img src={iconLogo} alt="logo" />
        <LoginForm />
        <SignUpBlock>
          Don&apos; have an account?&nbsp;
          <Link to="/signup">Sign up</Link>
        </SignUpBlock>
      </FormContainer>
    </MainLayout>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  & > img {
    margin-bottom: 40px;
  }
`;

const SignUpBlock = styled.div`
  margin-top: 32px;
  & :only-child {
    color: var(--main-001);
  }
`;

export default LogIn;
