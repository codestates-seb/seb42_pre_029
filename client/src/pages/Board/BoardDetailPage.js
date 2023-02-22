import Button from '../../components/Button';
// import { Link } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import styled from 'styled-components';
import TextArea from '../../components/TextArea';

function BoardDetail() {
  const [QueVotes, setQueVotes] = useState(0);
  const QueVotesHandller = e => {
    let value = e.target.className;
    let num = QueVotes;
    value === 'votesUp' ? (num += 1) : (num -= 1);
    setQueVotes(num);
  };
  const [AnsVotes, setAnsVotes] = useState(0);
  const ansVotesHandller = e => {
    let value = e.target.className;
    let num = AnsVotes;
    value === 'votesUp' ? (num += 1) : (num -= 1);
    setAnsVotes(num);
  };
  return (
    <>
      <MainLayout sideBar>
        <BoardDetailPageTitle>
          <h2>Error print user.default swift 1</h2>
          <EditInfo>
            <span>Asked 2023.02.21</span>
            <span>1 Viewed</span>
            <span>{`${QueVotes} votes`}</span>
          </EditInfo>
        </BoardDetailPageTitle>
        <QuestionBody>
          <Post>
            <VotesControl>
              <button onClick={e => QueVotesHandller(e)}>
                <div className="votesUp"></div>
              </button>
              <span>{QueVotes}</span>
              <button onClick={e => QueVotesHandller(e)}>
                <div className="votesDown"></div>
              </button>
            </VotesControl>
            <Context>
              I have two screens the first of login and the second shows the
              user information. On the login screen I keep the user_id value in
              user. defaults and when I go to the second screen I use that value
              to ... What does the ... do in this React (using JSX) code and
              what is it called?
            </Context>
          </Post>
          <Questioner>
            <span>Edit</span>
            <div className="round"></div>
            <span>Delete</span>
          </Questioner>
        </QuestionBody>
        <AnswerBody>
          <span>{`${1} answer`}</span>
          <TextArea className={'answer'}></TextArea>
          <Button
            bgColor={'var(--btn-default)'}
            textColor={'#fff'}
            hover={'var(--btn-hover)'}
            active={'var(--btn-selected)'}
            text={'Post Your Answer'}
            type={'positive'}
            Height={'32px'}
            width={'120px'}
          />

          <Post>
            <VotesControl>
              <button onClick={e => ansVotesHandller(e)}>
                <div className="votesUp"></div>
              </button>
              <span>{AnsVotes}</span>
              <button onClick={e => ansVotesHandller(e)}>
                <div className="votesDown"></div>
              </button>
            </VotesControl>
            <Context>
              I have two screens the first of login and the second shows the
              user information. On the login screen I keep the user_id value in
              user. defaults and when I go to the second screen I use that value
              to ... What does the ... do in this React (using JSX) code and
              what is it called?
            </Context>
          </Post>
        </AnswerBody>
      </MainLayout>
    </>
  );
}

const BoardDetailPageTitle = styled.header`
  & > h2 {
    font-size: var(--font-size-h2);
    font-weight: 600;
    color: var(--black-001);
  }
`;

const EditInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: var(--font-size-md);
  color: var(--black-004);
  margin-top: 30px;
  border-bottom: 1px solid var(--line-002);
  padding-bottom: 30px;
  & > span {
    margin-right: 16px;
  }
  & > :last-child {
    margin-right: 0;
  }
`;

const QuestionBody = styled.section`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--line-002);
  padding-bottom: 30px;
`;

const Post = styled.article`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 40px;
`;

const Context = styled.p`
  font-size: var(--font-size-lg);
  color: var(--black-002);
  line-height: 26px;
`;

const VotesControl = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
  & > button {
    background: none;
    & > .votesUp {
      width: 0px;
      height: 0px;
      border-bottom: 18px solid var(--black-005);
      border-left: 24px solid transparent;
      border-right: 24px solid transparent;
      cursor: pointer;
      margin-bottom: 10px;
    }
  }
  & > span {
    font-size: var(--font-size-h4);
    color: var(--black-004);
    text-align: center;
  }

  & > button {
    background: none;
    & > .votesDown {
      width: 0px;
      height: 0px;
      border-top: 18px solid var(--black-005);
      border-left: 24px solid transparent;
      border-right: 24px solid transparent;
      cursor: pointer;
      margin-top: 10px;
    }
  }
`;

const Questioner = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
  & > span {
    user-select: none;
    font-size: var(--font-size-md);
    color: var(--black-004);
    margin: 0px 8px;
    cursor: pointer;
    :active {
      color: var(--main-001);
    }
  }
  & > .round {
    width: 4px;
    height: 4px;
    background: var(--black-005);
  }
  & > :first-child {
    margin-left: 0;
  }
  & > :last-child {
    margin-right: 0;
  }
`;

const AnswerBody = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  & > span {
    font-size: var(--font-size-h3);
    color: var(--black-001);
  }
  & > .answer {
    border: 1px solid #333;
  }
`;
export default BoardDetail;
