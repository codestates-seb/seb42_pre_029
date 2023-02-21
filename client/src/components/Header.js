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
              selected={'var(--lbtn-selected)'}
              text={'log in'}
              type={'positive'}
            />
          </Link>
          <Link to="/signup">
            <Button
              bgColor={'var(--btn-default)'}
              textColor={'#fff'}
              border={'1px solid #83A6C4'}
              hover={'var(--btn-hover)'}
              selected={'var(--btn-selected)'}
              text={'sign up'}
              type={'positive'}
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
  padding: 0 20.3vw;
  height: 5.71em;
  box-shadow: 0px 6px 12px 0px #0000001f;

  & > Link {
    & > img {
      width: 9.2vw;
    }
  }
  & > .search_container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 28.1vw;
    border-radius: 0.21em;
    background-color: white;
    & > input {
      width: 100%;
      padding: 0.7em 0.6em 0.7em 0.6em;
      border-radius: 0.21em;
      &:focus {
        outline: none;
      }
    }
    & > img {
      width: 1.14em;
      margin-right: 0.6em;
      cursor: pointer;
      &:active {
        filter: invert();
      }
    }
  }
  & > .Button_container {
    & > :first-child {
      margin-right: 0.4vw;
    }
  }
`;

export default Header;
