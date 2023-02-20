import Header from '../../components/Header';
import Button from '../../components/Button';
import styled from 'styled-components';

function BoardList() {
  return (
    <>
      <Header />
      <PageTitle>
        <h1>All Questions</h1>
        <div>
          <p>
            <span>100,000,000</span>
            &nbsp;
            <span>Questions</span>
          </p>
          <Button />
        </div>
      </PageTitle>
    </>
  );
}

const PageTitle = styled.header`
  display: flex;
  flex-direction: column;
  padding: 0 20.3vw;
  & > h1 {
    font-size: var(--font-size-h1);
    font-weight: var(--black-001);
    font-weight: 600;
  }
  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default BoardList;
