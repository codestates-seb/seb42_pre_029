import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SideBarItem from './SideBarItem';

function SideBar() {
  const pathName = useLocation().pathname;
  const { user } = useSelector(state => state.auth);

  return (
    <SideBarContainer>
      <MenuContainer>
        <Link to={'/'}>
          <SideBarItem
            menu={'Questions'}
            isActive={pathName === '/' ? true : false}
          />
        </Link>
        {user ? (
          <Link to={'/my-page'}>
            <SideBarItem
              menu={'Users'}
              isActive={pathName === '/my-page' ? true : false}
            />
          </Link>
        ) : (
          <Link to={'/login'}>
            <SideBarItem
              menu={'Users'}
              isActive={pathName === '/login' ? true : false}
            />
          </Link>
        )}
      </MenuContainer>
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div`
  display: flex;
  position: sticky;
  flex-direction: column;
  top: 0;
  width: 200px;
`;

const MenuContainer = styled.div`
  height: 100%;
  padding-top: 80px;
  border-right: 1px solid var(--line-002);
`;

export default SideBar;
