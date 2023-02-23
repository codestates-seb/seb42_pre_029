import MainLayout from '../../components/MainLayout';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import questions from '../../data/message_question.json';
import { useEffect, useState } from 'react';
import Pagenation from '../../components/Pagenation';

function BoardList() {
  // 질문데이터 받아오기
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const total = data.length;

  useEffect(() => {
    setData(questions.questions);
  }, []);

  // 현재페이지 보여주기

  return (
    <MainLayout sideBar>
      <BoardListPageTitle>
        <div>
          <h1>All Questions</h1>
          <p>{`${total} Questions`}</p>
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
        {data
          .slice(offset, offset + limit)
          .map(
            ({
              questionid,
              title,
              body,
              createdAt,
              modifiedAt,
              view,
              answercount,
            }) => {
              return (
                <li key={questionid}>
                  <div className="container">
                    <Link className="h4" to={`/board-detail/${questionid}`}>
                      {title}
                    </Link>
                    <div className="editor">
                      <div className="editorInfo">
                        <img
                          src={`https://placeimg.com/200/100/people/${questionid}`}
                          alt="practice"
                        />
                        <p>Andy Obusek</p>
                      </div>
                      <span> {`${createdAt} ${modifiedAt}`}</span>
                    </div>
                  </div>
                  <p>{body}</p>
                  <div className="questionInfo">
                    <span>{`${answercount} answer`}</span>
                    <div className="round"></div>
                    <span>{`${view} views`}</span>
                    <div className="round"></div>
                    <span>{`${1} votes`}</span>
                  </div>
                </li>
              );
            },
          )}
      </QuestionList>

      <Pagenation
        limit={limit}
        setPage={setPage}
        total={total}
        page={page}
        setLimit={setLimit}
      />
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
        line-height: 28px;
        max-width: 600px;
        max-height: 60px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
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
export default BoardList;
