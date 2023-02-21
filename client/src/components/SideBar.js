import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SideBarItem from './SideBarItem';

function SideBar() {
  const pathName = useLocation().pathname;

  const menus = [
    { name: 'Questions', path: '/' },
    { name: 'Tags', path: '/' },
    { name: 'Users', path: '/login' },
  ];

  return (
    <SideBarContainer>
      {menus.map((menu, index) => {
        return (
          <Link to={menu.path} key={index}>
            <SideBarItem
              menu={menu.name}
              isActive={pathName === menu.path ? true : false}
            />
          </Link>
        );
      })}
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div`
  display: flex;
  position: sticky;
  flex-direction: column;
  top: 0;
  width: 200px;
  height: 100%;
  padding-top: 80px;
  border-right: 1px solid var(--line-002);
`;

export default SideBar;
