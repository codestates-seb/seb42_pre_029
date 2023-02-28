import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout';
import styled from 'styled-components';
import TextArea from '../../components/TextArea';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditModal from './EditModal';

function BoardDetail() {
  const params = useParams();
  const { no } = params;
  const [QuestData, setQuestData] = useState({});
  const [qUser, setQUser] = useState({});
  const [ansData, setAnsData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // todo1. 질문 추천
  // const [QueVotes, setQueVotes] = useState(0);
  // const QueVotesHandller = e => {
  //   let value = e.target.className;
  //   let num = QueVotes;
  //   value === 'votesUp' ? (num += 1) : (num -= 1);
  //   setQueVotes(num);
  // };

  // todo2. 답변 추천
  // const [AnsVotes, setAnsVotes] = useState(0);
  // const ansVotesHandller = e => {
  //   let value = e.target.className;
  //   let num = AnsVotes;
  //   value === 'votesUp' ? (num += 1) : (num -= 1);
  //   setAnsVotes(num);
  // };

  // todo3. 답변 작성

  const [inputAnswer, setInputAnswer] = useState('');

  const answerHandller = e => {
    if (e.target.value !== '') setInputAnswer(e.target.value);
  };

  const answerSubmit = () => {
    let data = {
      body: inputAnswer,
      questionId: QuestData.questionid,
      memberId: QuestData.questionid,
    };

    if (inputAnswer.length >= 20) {
      axios
        .post(
          `http://ec2-3-35-235-136.ap-northeast-2.compute.amazonaws.com:8080/answers`,
          data,
        )
        .then(res => console.log(res))
        .catch(err => console.log(err));
    } else alert('20글자 이상 입력해 주세요.');
    setInputAnswer('');
  };

  // todo4. 데이터 불러오기

  useEffect(() => {
    axios
      .get(
        `http://ec2-3-35-235-136.ap-northeast-2.compute.amazonaws.com:8080/questions/${no}`,
      )
      .then(({ data }) => setQuestData(data.data))
      .catch(err => console.log(err));
    // 답변 데이터 받아오기
    axios
      .get(
        `http://ec2-3-35-235-136.ap-northeast-2.compute.amazonaws.com:8080/answers/${no}`,
      )
      .then(data =>
        Array.isArray(data.data)
          ? setAnsData([...data.data])
          : setAnsData([data.data]),
      )
      .catch(err => console.log(err));
    axios
      .get(
        `http://ec2-3-35-235-136.ap-northeast-2.compute.amazonaws.com:8080/members/1`,
      )
      .then(({ data }) => {
        setQUser(data.data);
        console.log(data);
      });
  }, []);

  //todo5. 질문 삭제&수정 구현

  const deleteQuestion = () => {
    axios.delete(
      `http://ec2-3-35-235-136.ap-northeast-2.compute.amazonaws.com:8080/questions/${no}`,
    );
    window.location.href = '/';
  };

  //todo6. 현재 시간 기준으로 얼마나 지났는지 계산
  function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60,
    );
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime} minute ago`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour} hour ago`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay} day ago`;
    }

    return `${Math.floor(betweenTimeDay / 365)} year ago`;
  }

  return (
    <>
      <EditModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={'Edit Your Question'}
      />
      <MainLayout sideBar>
        <BoardDetailPageTitle>
          <h2>{QuestData.title}</h2>
          <EditLayout>
            <Editor>
              <img
                src={`https://placeimg.com/200/100/people/${QuestData.questionid}`}
                alt="practice"
              />
              <p>{qUser.username}</p>
            </Editor>
            <EditInfo>
              <span>{`${timeForToday(QuestData.createdAt)}`}</span>
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
          <PostHanddle>
            <button type="text" onClick={() => setOpenModal(true)}>
              Edit
            </button>
            <div className="round"></div>
            <button type="text" onClick={deleteQuestion}>
              Delete
            </button>
          </PostHanddle>
        </QuestionBody>
        <AnswerBody>
          <span>{`${ansData.length} answer`}</span>
          <TextArea
            value={inputAnswer}
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
          {ansData.map(({ body, createdAt, view }, i) => {
            console.log(body);
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
                <AnsEditor>
                  <Editor>
                    <img
                      src={`https://placeimg.com/200/100/people/${no}`}
                      alt="practice"
                    />
                    <p>{'Andy Obusek'}</p>
                  </Editor>
                  <EditInfo>
                    <span>{`${timeForToday(createdAt)}`}</span>
                    <span>{`${view} view`}</span>
                    {/* <span>{`${QueVotes} votes`}</span> */}
                  </EditInfo>
                </AnsEditor>
                <Context>{body}</Context>
                <PostHanddle>
                  <button type="text">Edit</button>
                  <div className="round"></div>
                  <button type="text" onClick={deleteQuestion}>
                    Delete
                  </button>
                </PostHanddle>
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
  align-items: flex-end;
  > img {
    width: 16px;
    height: 16px;
    margin-right: 6px;
    border-radius: 3px;
  }
  > p {
    font-size: var(--font-size-md);
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
  & > article {
    border: none;
    padding-bottom: 0px;
  }
`;

const Post = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 40px;
  border-bottom: 1px solid var(--line-002);
  padding-bottom: 30px;
`;

const Context = styled.p`
  font-size: var(--font-size-lg);
  color: var(--black-002);
  line-height: 26px;
  margin-bottom: 30px;
`;
const AnsEditor = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-top: 1px solid var(--black-006);
  border-bottom: 1px solid var(--line-002);
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

const PostHanddle = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  & > button {
    user-select: none;
    font-size: var(--font-size-md);
    color: var(--black-004);
    background: none;
    margin: 0px 8px;
    cursor: pointer;
    :first-child {
      padding-left: 0;
    }
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
