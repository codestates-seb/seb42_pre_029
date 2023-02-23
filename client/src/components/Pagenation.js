import styled from 'styled-components';

//? Props = 전체 데이터 갯수, 보여줄 페이지 수, 현재 페이지, 페이지 상태변경 함수, 보여줄 페이지 상태변경 함수
function Pagenation({ total, limit, page, setPage, setLimit }) {
  const numPages = Math.ceil(total / limit);
  console.log(total);
  return (
    <PagenationLayout>
      <Nav>
        <NumBtn onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </NumBtn>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <NumBtn
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? 'page' : null}
            >
              {i + 1}
            </NumBtn>
          ))}
        <NumBtn onClick={() => setPage(page + 1)} disabled={page === numPages}>
          Next
        </NumBtn>
      </Nav>
      <PerPage>
        per page &nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </PerPage>
    </PagenationLayout>
  );
}

const PagenationLayout = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const NumBtn = styled.button`
  border: 1px solid var(--line-003);
  border-radius: 3px;
  padding: 4px 10px;
  margin: 0;
  color: var(--black-003);
  font-size: var(--font-size-md);
  background: none;

  &:hover {
    cursor: pointer;
    background: var(--black-005);
  }

  &[disabled] {
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    font-weight: bold;
    color: white;
    background-color: var(--main-002);
    cursor: revert;
    transform: revert;
  }
`;

const PerPage = styled.label`
  color: var(--black-002);
  font-size: var(--font-size-md);
  & > select {
    border: 1px solid var(--line-003);
    border-radius: 3px;
    padding: 4px 10px;
    margin: 0;
    color: var(--black-003);
    font-size: var(--font-size-md);
  }
`;
export default Pagenation;
