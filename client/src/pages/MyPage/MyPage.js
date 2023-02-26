import Pagenation from '../../components/Pagenation';
import questions from '../../data/message_question.json';
import answers from '../../data/message_answer.json';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import styled from 'styled-components';
import Button from '../../components/Button';
import myImg from '../../assets/myImg.svg';
import phonenum from '../../assets/phonenum.svg';
import mail from '../../assets/mail.svg';
import birthday from '../../assets/birthday.svg';
// import Members from '../../data/message_member.json';

function MyPage() {
  const [questionsData, setQuestionsData] = useState([]);
  const [answersData, setAnswersData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const total = questionsData.length;

  useEffect(() => {
    setQuestionsData(questions.questions);
  }, []);

  useEffect(() => {
    setAnswersData(answers.answers);
  }, []);

  return (
    <MainLayout sideBar>
      <UserInfoContainer>
        <img src={myImg} alt="myImg" />
        <UserInfoWrapper>
          <h2>열글자이상넘어가면놉</h2>
          <div>
            <img src={phonenum} alt="phone" />
            <span>010-1234-5678</span>
            <img src={mail} alt="e-mail" />
            <span>codestates@gmail.com</span>
            <img src={birthday} alt="birthday" />
            <span>1990.00.00</span>
          </div>
        </UserInfoWrapper>
        <Button
          text={'Edit Profile'}
          textColor={'#fff'}
          bgColor={'var(--main-002)'}
          width={'4vw'}
        />
      </UserInfoContainer>
      <QuestionContainer>
        <h2>Question</h2>
        <QuestionInfo>
          {questionsData
            .slice(offset, offset + limit)
            .map(({ questionid, title, createdAt }) => {
              return (
                <li key={questionid}>
                  <div className="qcontainer">
                    <span className="qnumber"> 0{questionid} </span>
                    <Link className="qlist" to={`/board-detail/${questionid}`}>
                      {title}
                    </Link>
                    <span className="qdate"> {`${createdAt}`}</span>
                  </div>
                </li>
              );
            })}
        </QuestionInfo>
      </QuestionContainer>
      <Pagenation
        limit={limit}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
        total={total}
      />
      <AnswerContainer>
        <h2>Answer</h2>
        <AnswerInfo>
          {answersData
            .slice(offset, offset + limit)
            .map(({ answerid, body, createdAt }) => {
              return (
                <li key={answerid}>
                  <div className="acontainer">
                    <span className="anumber"> 0{answerid} </span>
                    <Link className="alist" to={`/board-detail/${answerid}`}>
                      {body}
                    </Link>
                    <span className="adate"> {`${createdAt}`}</span>
                  </div>
                </li>
              );
            })}
        </AnswerInfo>
      </AnswerContainer>
      <Pagenation
        limit={limit}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
        total={total}
      />
    </MainLayout>
  );
}

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--line-002);
  margin-top: 15px;
  padding-bottom: 30px;
  color: var(--black-001);
  & > :nth-child(2) {
    flex-grow: 1;
  }
  & > :last-child {
    margin-top: 35px;
  }
  & h2 {
    font-size: var(--font-size-h2);
    font-weight: bold;
    margin-bottom: 18px;
  }
  & span {
    font-size: var(--font-size-md);
    font-weight: bold;
    color: var(--black-004);
  }
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 35px;
  & > div {
    display: flex;
    & > :nth-child(odd) {
      margin-right: 6px;
    }
    & > :nth-child(even) {
      margin-right: 30px;
    }
  }
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-md);
  color: var(--black-001);
  width: 900px;
  margin-top: 35px;
  margin-bottom: 20px;
  & > h2 {
    font-size: var(--font-size-h4);
    font-weight: bold;
  }
`;

const QuestionInfo = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-lg);
  padding: 25px;
  margin-top: 20px;
  width: 950px;
  border: 1px solid var(--line-001);
  border-radius: 5px;
  & .qcontainer {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  & .qnumber {
    color: var(--main-002);
    padding-right: 15px;
  }
  & .qlist {
    flex-grow: 1;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & .qdate {
    color: var(--black-006);
    margin-left: 60px;
  }
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-md);
  color: var(--black-001);
  margin-top: 35px;
  margin-bottom: 20px;
  & > h2 {
    font-size: var(--font-size-h4);
    font-weight: bold;
  }
`;

const AnswerInfo = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-lg);
  padding: 25px;
  margin-top: 20px;
  width: 950px;
  border: 1px solid var(--line-001);
  border-radius: 5px;
  & .acontainer {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  & .anumber {
    color: var(--main-002);
    padding-right: 15px;
  }
  & .alist {
    flex-grow: 1;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & .adate {
    color: var(--black-006);
    margin-left: 60px;
  }
`;

export default MyPage;
