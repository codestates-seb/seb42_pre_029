import styled, { css } from 'styled-components';

function SideBarItem({ menu, isActive }) {
  return <ItemContainer isActive={isActive}>{menu}</ItemContainer>;
}

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  height: 45px;
  padding: 12px 30px;
  font-weight: 500;
  color: var(--black-003);
  &:hover {
    color: var(--black-001);
  }
  ${props =>
    props.isActive &&
    css`
      background: #f1f2f3;
      font-weight: bold;
      color: var(--black-001);
      border-right: 3px solid var(--main-002);
    `}
`;

export default SideBarItem;
