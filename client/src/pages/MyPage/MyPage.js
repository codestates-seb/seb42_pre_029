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
import EditModal from '../MyPage/EditModal';
// import axios from 'axios';

function MyPage() {
  const [questionsData, setQuestionsData] = useState([]);
  const [answersData, setAnswersData] = useState([]);
  const [questionLimit, setQuestionLimit] = useState(5);
  const [questionPage, setQuestionPage] = useState(1);
  const [answerLimit, setAnswerLimit] = useState(5);
  const [answerPage, setAnswerPage] = useState(1);
  const questionOffset = (questionPage - 1) * questionLimit;
  const answerOffset = (answerPage - 1) * answerLimit;
  const questionTotal = questionsData.length;
  const answerTotal = answersData.length;
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState([]);
  // const [name, setName] = usestate('');
  // const [phone, setPhone] = usestate('');
  // const [email, setEmail] = usestate('');
  // const [birth, setBirth] = usestate('');

  useEffect(() => {
    fetch(
      'http://ec2-13-209-84-68.ap-northeast-2.compute.amazonaws.com:8080/questions',
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        setQuestionsData(data);
      });
  }, []);

  useEffect(() => {
    fetch(
      'http://ec2-13-209-84-68.ap-northeast-2.compute.amazonaws.com:8080/questions',
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        setAnswersData(data);
      });
  }, []);

  useEffect(() => {
    setQuestionsData(questions.questions);
  }, []);

  useEffect(() => {
    setAnswersData(answers.answers);
  }, []);

  useEffect(() => {
    fetch(
      'http://ec2-13-209-84-68.ap-northeast-2.compute.amazonaws.com:8080/members',
      {
        headers: {},
      },
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        setUserData(data);
      });
  }, []);

  // axios
  //   .get(`/api/members/${user.memberid}`, {
  //     headers: {
  //       Authorization: user.authorization,
  //     },
  //   })
  //   .then(response => console.log(response))
  //   .catch(error => console.log(error));

  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://ec2-13-209-84-68.ap-northeast-2.compute.amazonaws.com:8080/members/{}`,
  //     )
  //     .then(res => {
  //       setUserData(data);
  //       setName(data.username);
  //       setPhone(data.phone);
  //       setEmail(data.email);
  //       setBirth(data.birth);
  //     })
  //     .catch(err => console.log(err));
  // }, []);

  // const updateAccount = (e) => {
  //   e.preventDefault();
  //   axios

  return (
    <>
      <EditModal open={openModal} onClose={() => setOpenModal(false)} />
      <MainLayout sideBar>
        <UserInfoContainer>
          <img src={myImg} alt="myImg" />
          <UserInfoWrapper>
            <h2>{userData.username}</h2>
            <div>
              <img src={phonenum} alt="phone" />
              <span>{userData.phone}</span>
              <img src={mail} alt="e-mail" />
              <span>{userData.email}</span>
              <img src={birthday} alt="birthday" />
              <span>{userData.birth}</span>
            </div>
          </UserInfoWrapper>
          <Button
            onClick={() => setOpenModal(true)}
            text={'Edit Profile'}
            textColor={'#fff'}
            bgColor={'var(--main-002)'}
            width={'4vw'}
            height={'35px'}
            fontSize={'var(--font-size-md)'}
            hover={'#f0820e'}
            active={'#d1710a'}
          />
        </UserInfoContainer>
        <QuestionContainer>
          <h2>Question</h2>
          <QuestionInfo>
            {questionsData
              .slice(questionOffset, questionOffset + questionLimit)
              .map(({ questionId, title, createdAt }) => {
                return (
                  <li key={questionId}>
                    <div className="qcontainer">
                      <span className="qnumber"> 0{questionId} </span>
                      <Link
                        className="qlist"
                        to={`/board-detail/${questionId}`}
                      >
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
          limit={questionLimit}
          setLimit={setQuestionLimit}
          page={questionPage}
          setPage={setQuestionPage}
          total={questionTotal}
        />
        <AnswerContainer>
          <h2>Answer</h2>
          <AnswerInfo>
            {answersData
              .slice(answerOffset, answerOffset + answerLimit)
              .map(({ answerId, body, createdAt }) => {
                return (
                  <li key={answerId}>
                    <div className="acontainer">
                      <span className="anumber"> 0{answerId} </span>
                      <Link className="alist" to={`/board-detail/${answerId}`}>
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
          limit={answerLimit}
          setLimit={setAnswerLimit}
          page={answerPage}
          setPage={setAnswerPage}
          total={answerTotal}
        />
      </MainLayout>
    </>
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
    width: 600px;
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
    width: 600px;
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
