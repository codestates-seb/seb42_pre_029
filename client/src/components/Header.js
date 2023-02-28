import Button from './Button';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import searchImg from '../assets/search.svg';
import logoImg from '../assets/logo.svg';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <GNB>
      <Link to="/">
        <img src={logoImg} alt="logo" />
      </Link>
      <div className="search_container">
        <input type="text"></input>
        <img src={searchImg} alt="search" />
      </div>
      {user ? (
        <div>
          <Button
            onClick={onLogout}
            textColor={'#487299'}
            bgColor={'var(--lbtn-default)'}
            border={'1px solid #83A6C4'}
            hover={'var(--lbtn-hover)'}
            active={'var(--lbtn-selected)'}
            text={'Log out'}
            type={'positive'}
            Height={'32px'}
            width={'81px'}
          />
        </div>
      ) : (
        <div className="Button_container">
          <Link to="/login">
            <Button
              textColor={'#487299'}
              bgColor={'var(--lbtn-default)'}
              border={'1px solid #83A6C4'}
              hover={'var(--lbtn-hover)'}
              active={'var(--lbtn-selected)'}
              text={'Log in'}
              type={'positive'}
              Height={'32px'}
              width={'80px'}
            />
          </Link>
          <Link to="/signup">
            <Button
              textColor={'#fff'}
              bgColor={'var(--btn-default)'}
              hover={'var(--btn-hover)'}
              active={'var(--btn-selected)'}
              text={'Sign up'}
              type={'positive'}
              Height={'32px'}
              width={'80px'}
            />
          </Link>
        </div>
      )}
    </GNB>
  );
}

const GNB = styled.nav`
  background-color: #f3f3f3;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 390px;
  height: 80px;
  box-shadow: 0px 6px 12px 0px #0000001f;

  & > Link {
    & > img {
      width: 32px;
    }
  }
  & > .search_container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 540px;
    background-color: white;
    & > input {
      width: 100%;
      padding: 8px 12px;
      border-radius: 3px;
      &:focus {
        outline: none;
      }
    }
    & > img {
      width: 16px;
      margin-right: 10px;
      cursor: pointer;
      &:active {
        filter: invert();
      }
    }
  }
  & > .Button_container {
    & > :first-child {
      margin-right: 8px;
    }
  }
`;

export default Header;
