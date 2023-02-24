import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout';
import styled from 'styled-components';
import TextArea from '../../components/TextArea';
import { useParams } from 'react-router-dom';
import questions from '../../data/message_question.json';
import answer from '../../data/message_answer.json';
import member from '../../data/message_member.json';

function BoardDetail() {
  // 데이터 불러오기
  const params = useParams();
  const { no } = params;
  const [QuestData, setQuestData] = useState({});
  const [ansData, setAnsData] = useState([]);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const questionData = questions.questions.filter(
      e => e.questionid === +no,
    )[0];
    setQuestData(questionData);
    const answerData = answer.answers.filter(
      e => e.questionid === questionData.questionid,
    );
    setAnsData(answerData);
    const membersData = member.members.filter(
      e => e.memberid === questionData.memberid,
    )[0];
    setUserData(membersData);
  }, []);
  // // 질문 추천
  // const [QueVotes, setQueVotes] = useState(0);
  // const QueVotesHandller = e => {
  //   let value = e.target.className;
  //   let num = QueVotes;
  //   value === 'votesUp' ? (num += 1) : (num -= 1);
  //   setQueVotes(num);
  // };

  // // 답변 추천
  // const [AnsVotes, setAnsVotes] = useState(0);
  // const ansVotesHandller = e => {
  //   let value = e.target.className;
  //   let num = AnsVotes;
  //   value === 'votesUp' ? (num += 1) : (num -= 1);
  //   setAnsVotes(num);
  // };

  //답변 작성
  const [inputAnswer, setInputAnswer] = useState('');
  const answerHandller = e => {
    setInputAnswer(e.target.value);
  };
  const answerSubmit = () => {
    let newAnswerData = {
      answerid: answer.answers.length + 1,
      body: inputAnswer,
      createdAt: new Date(),
      modifiedAt: new Date(),
    };
    setAnsData([...ansData, newAnswerData]);
    console.log(answer.answers);
  };

  return (
    <>
      <MainLayout sideBar>
        <BoardDetailPageTitle>
          <h2>{QuestData.title}</h2>
          <EditLayout>
            <Editor>
              <img
                src={`https://placeimg.com/200/100/people/${QuestData.questionid}`}
                alt="practice"
              />
              <p>{userData.name}</p>
            </Editor>
            <EditInfo>
              <span>{`${QuestData.createdAt} ago`}</span>
              <span>{`${QuestData.view} view`}</span>
              {/* <span>{`${QueVotes} votes`}</span> */}
            </EditInfo>
          </EditLayout>
        </BoardDetailPageTitle>
        <QuestionBody>
          <Post>
            {/* <VotesControl>
              <button onClick={e => QueVotesHandller(e)}>
                <div className="votesUp"></div>
              </button>
              <span>{QueVotes}</span>
              <button onClick={e => QueVotesHandller(e)}>
                <div className="votesDown"></div>
              </button>
            </VotesControl> */}
            <Context>{QuestData.body}</Context>
          </Post>
          <Questioner>
            <span>Edit</span>
            <div className="round"></div>
            <span>Delete</span>
          </Questioner>
        </QuestionBody>
        <AnswerBody>
          <span>{`${ansData.length} answer`}</span>
          <TextArea
            border={'1px solid var(--line-001)'}
            width={'100%'}
            height={'300px'}
            margin={'20px 0 20px 0'}
            borderRadius={'3px'}
            padding={'24px'}
            fontSize={'var(--font-size-md)'}
            fontColor={'var(--black-002)'}
            placeholder={'please input your answer'}
            onChange={e => answerHandller(e)}
          ></TextArea>
          <Button
            bgColor={'var(--btn-default)'}
            textColor={'#fff'}
            hover={'var(--btn-hover)'}
            active={'var(--btn-selected)'}
            text={'Post Your Answer'}
            type={'positive'}
            Height={'32px'}
            width={'120px'}
            onClick={answerSubmit}
          />
          {ansData.map(({ body }, i) => {
            return (
              <Post key={i}>
                {/* <VotesControl>
                  <button onClick={e => ansVotesHandller(e)}>
                    <div className="votesUp"></div>
                  </button>
                  <span>{AnsVotes}</span>
                  <button onClick={e => ansVotesHandller(e)}>
                    <div className="votesDown"></div>
                  </button>
                </VotesControl> */}
                <Context>{body}</Context>
              </Post>
            );
          })}
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
    line-height: 40px;
  }
`;
const EditLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid var(--line-002);
  padding-bottom: 30px;
`;
const Editor = styled.div`
  display: flex;
  flex-direction: row;
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
`;
const EditInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: var(--font-size-md);
  color: var(--black-004);
  margin-top: 30px;

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
  border-bottom: 1px solid var(--line-002);
  padding-bottom: 30px;
  :last-child {
    border-bottom: none;
    padding-bottom: none;
  }
`;

const Context = styled.p`
  font-size: var(--font-size-lg);
  color: var(--black-002);
  line-height: 26px;
`;
//vote 기능 css
// const VotesControl = styled.article`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-right: 30px;
//   & > button {
//     background: none;
//     & > .votesUp {
//       width: 0px;
//       height: 0px;
//       border-bottom: 18px solid var(--black-005);
//       border-left: 24px solid transparent;
//       border-right: 24px solid transparent;
//       cursor: pointer;
//       margin-bottom: 10px;
//     }
//   }
//   & > span {
//     font-size: var(--font-size-h4);
//     color: var(--black-004);
//     text-align: center;
//   }

//   & > button {
//     background: none;
//     & > .votesDown {
//       width: 0px;
//       height: 0px;
//       border-top: 18px solid var(--black-005);
//       border-left: 24px solid transparent;
//       border-right: 24px solid transparent;
//       cursor: pointer;
//       margin-top: 10px;
//     }
//   }
// `;

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
`;
export default BoardDetail;
