import MainLayout from '../../components/MainLayout';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import { useState } from 'react';

function BoardList() {
  const totalQuestion = 10000000;
  const answer = 1;
  const views = 1;
  const votes = 1;
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  // const [limit, setLimit] = useState(10);
  // const [page, setPage] = useState(1);
  // const offset = (page - 1) * limit;
  return (
    <MainLayout sideBar>
      <BoardListPageTitle>
        <div>
          <h1>All Questions</h1>
          <p>{`${totalQuestion} Questions`}</p>
        </div>
        <Link to="/board-write">
          <Button
            bgColor={'var(--main-002)'}
            textColor={'#fff'}
            text={'Ask Question'}
            type={'positive'}
            width={'6vw'}
          />
        </Link>
      </BoardListPageTitle>
      <QuestionList>
        {arr.map((e, i) => {
          return (
            <li key={i}>
              <div className="container">
                <Link className="h4" to="/board-detail">
                  {`Error print user.default swift ${e}`}
                </Link>
                <div className="editor">
                  <div className="editorInfo">
                    <img
                      src={`https://placeimg.com/200/100/people/${e}`}
                      alt="practice"
                    />
                    <p>Andy Obusek</p>
                  </div>
                  <span> modified 21 mins ago</span>
                </div>
              </div>
              <p>
                I have two screens the first of login and the second shows the
                user information. On the login screen I keep the user_id value
                in user. defaults and when I go to the second screen I use that
                value to ...
              </p>
              <div className="questionInfo">
                <span>{`${answer} answer`}</span>
                <div className="round"></div>
                <span>{`${views} views`}</span>
                <div className="round"></div>
                <span>{`${votes} votes`}</span>
              </div>
            </li>
          );
        })}
      </QuestionList>
      <PageNation></PageNation>
    </MainLayout>
  );
}

const BoardListPageTitle = styled.header`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--line-002);
  padding-bottom: 30px;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & > h1 {
      font-size: var(--font-size-h1);
      color: var(--black-001);
      font-weight: 600;
      margin-bottom: 30px;
    }
    & > p {
      font-size: var(--font-size-lg);
      color: var(--black-002);
    }
  }
`;

const QuestionList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 30px 0 125px 0;
  & > li {
    display: flex;
    flex-direction: column;
    padding: 24px;
    box-shadow: 0px 2px 12px 0px #0000000d;
    margin-top: 20px;
    & > .container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      & > .h4 {
        font-size: var(--font-size-h4);
        font-weight: 600;
        color: var(--main-001);
      }
      & > .editor {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        & > .editorInfo {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          > img {
            width: 16px;
            height: 16px;
            margin-right: 6px;
            border-radius: 3px;
          }
          > p {
            font-size: var(--font-size-sm);
            color: #0075cf;
            margin-right: 8px;
          }
        }
        > span {
          font-size: var(--font-size-sm);
          color: var(--black-004);
        }
      }
    }
    & > p {
      color: var(--black-003);
      line-height: 24px;
      margin-top: 18px;
    }
    & > .questionInfo {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 10px;
      & > span {
        user-select: none;
        font-size: var(--font-size-sm);
        font-weight: 600;
        color: var(--main-002);
        margin-right: 8px;
        margin-left: 8px;
        :first-child {
          margin-left: 0px;
        }
      }
      & > .round {
        width: 2px;
        height: 2px;
        background: #f4952966;
      }
    }
    :first-child {
      margin-top: 0;
    }
  }
`;
const PageNation = styled.label``;
export default BoardList;
