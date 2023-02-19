import Button from './Button';
import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';

const GNB = styled.nav`
  background-color: #f3f3f3;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 27.86em;
  height: 5.71em;
  box-shadow: 0px 6px 12px 0px #0000001f;

  & > img {
    height: 2em;
  }
  & > .search_container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 38.6em;
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
      margin-right: 0.63em;
    }
  }
`;

const Header = () => {
  // const navigate = useNavigate();
  // const toLogin = () => {
  //   navigate(
  //     'https://stackoverflow.com/users/login?ssrc=head&returnurl=https%3a%2f%2fstackoverflow.com%2f',
  //   );
  // };
  return (
    <>
      <GNB>
        <img src="img/logo.svg" alt="logo" />
        <div className="search_container">
          <input type="text"></input>
          <img src="img/search.svg" alt="search" />
        </div>

        <div className="Button_container">
          <Button
            style={'skyblue'}
            text={'log in'}
            type={'positive'}
            // onClick={toLogin}
          />
          <Button
            style={'blue'}
            text={'sign up'}
            type={'positive'}
            onClick={() => console.log('click')}
          />
        </div>
      </GNB>
    </>
  );
};

export default Header;
