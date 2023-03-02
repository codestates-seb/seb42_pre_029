import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '../../components/MainLayout';
import SignUpGuide from './SignUpGuide';
import SignUpForm from './SignUpForm';

function SignUp() {
  return (
    <MainLayout>
      <ItemContainer>
        <SignUpGuide />
        <FormContainer>
          <SignUpForm />
          <LogInBlock>
            Already have an account?&nbsp;
            <Link to="/login">Log in</Link>
          </LogInBlock>
        </FormContainer>
      </ItemContainer>
    </MainLayout>
  );
}

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogInBlock = styled.div`
  margin-top: 32px;
  & :only-child {
    color: var(--main-001);
  }
`;

export default SignUp;
