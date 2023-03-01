import Button from './Button';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import searchImg from '../assets/search.svg';
import logoImg from '../assets/logo.svg';
import myImg from '../assets/myImg.svg';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const memberid = user ? user.memberid : 0;
  console.log(memberid);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <GNB>
      <ItemContainer>
        <Link to="/">
          <img src={logoImg} alt="logo" />
        </Link>
        <div className="search_container">
          <input type="text"></input>
          <img src={searchImg} alt="search" />
        </div>
        {user ? (
          <div className="Button_container">
            <Link to="/my-page">
              <img src={myImg} alt="myImg" height="32" width="32" />
              <span>열글자이상넘어가면놉</span>
            </Link>
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
      </ItemContainer>
    </GNB>
  );
}

const GNB = styled.div`
  background-color: #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 0 390px; */
  height: 80px;
  box-shadow: 0px 6px 12px 0px #0000001f;
`;

const ItemContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1140px;
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
    display: flex;
    & > :first-child {
      margin-right: 8px;
    }
  }
`;

export default Header;
