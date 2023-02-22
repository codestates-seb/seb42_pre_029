import Button from './Button';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <GNB>
        <Link to="/">
          <img src="img/logo.svg" alt="logo" />{' '}
        </Link>
        <div className="search_container">
          <input type="text"></input>
          <img src="img/search.svg" alt="search" />
        </div>

        <div className="Button_container">
          <Link to="/login">
            <Button
              bgColor={'var(--lbtn-default)'}
              textColor={'#487299'}
              border={'1px solid #83A6C4'}
              hover={'var(--lbtn-hover)'}
              active={'var(--lbtn-selected)'}
              text={'log in'}
              type={'positive'}
              Height={'32px'}
              width={'81px'}
            />
          </Link>
          <Link to="/signup">
            <Button
              bgColor={'var(--btn-default)'}
              textColor={'#fff'}
              hover={'var(--btn-hover)'}
              active={'var(--btn-selected)'}
              text={'sign up'}
              type={'positive'}
              Height={'32px'}
              width={'81px'}
            />
          </Link>
        </div>
      </GNB>
    </>
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
