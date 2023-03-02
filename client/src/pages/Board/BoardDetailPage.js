import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout';
import styled from 'styled-components';
import TextArea from '../../components/TextArea';
import axios from 'axios';
import EditModal from './EditModal';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { timeForToday } from './util/timeForToday';

function BoardDetail() {
  const [QuestData, setQuestData] = useState({});
  const [ansData, setAnsData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [answerid, setAnswerid] = useState(0);
  const [answerbody, setAnswerbody] = useState('');
  const { no } = useParams();
  const { user } = useSelector(state => state.auth);
  const memberid = user ? user.memberid : 1;
  const navigate = useNavigate();
  // todo3. 데이터 불러오기

  let QuestionsUrl = `/api/questions`;

  let AnswersUrl = `/api/answers`;

  useEffect(() => {
    axios
      .get(`${QuestionsUrl}/${no}`)
      .then(({ data }) => setQuestData(data.data))
      .catch(err => console.log(err));
    axios
      .get(`${AnswersUrl}/question/${no}`)
      .then(data => {
        Array.isArray(data.data)
          ? setAnsData([...data.data])
          : setAnsData([data.data]);
      })
      .catch(err => console.log(err));
  }, []);

  // todo4. 답변 작성

  const [inputAnswer, setInputAnswer] = useState('');

  //todo5. 질문&답변 삭제,업데이트 구현

  const deleteQuestion = () => {
    axios.delete(`${QuestionsUrl}/${no}`);
    navigate('/');
  };
  return (
    <>
      <EditModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        name={modalType}
        dataTitle={modalType === 'Question' ? QuestData.title : ''}
        dataBody={modalType === 'Question' ? QuestData.body : answerbody}
        url={
          modalType === 'Question'
            ? `${QuestionsUrl}/${no}`
            : `${AnswersUrl}/${answerid}`
        }
        setData={modalType === 'Question' ? setQuestData : setAnsData}
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
              <p>{QuestData.username || '질문자'}</p>
            </Editor>
            <EditInfo>
              <span>{`${timeForToday(QuestData.createdAt)}`}</span>
              <span>{`${QuestData.view} view`}</span>
            </EditInfo>
          </EditLayout>
        </BoardDetailPageTitle>
        <QuestionBody>
          <Post>
            <Context>{QuestData.body}</Context>
          </Post>
          <PostHanddle>
            <button
              type="text"
              onClick={() => {
                setOpenModal(true);
                setModalType('Question');
              }}
            >
              Edit
            </button>
            <div className="round"></div>
            <button type="submit" onClick={deleteQuestion}>
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
            onChange={e => {
              if (e.target.value !== '') setInputAnswer(e.target.value);
            }}
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
            onClick={() => {
              let data = {
                body: inputAnswer,
                questionId: QuestData.questionId,
                memberId: memberid,
              };

              if (inputAnswer.length >= 1) {
                axios
                  .post(AnswersUrl, data)
                  .then(res => console.log(res))
                  .catch(err => console.log(err));
              }
              setInputAnswer('');
            }}
          />
          {ansData.map(({ answerId, body, createdAt, username }, i) => {
            return (
              <Post key={i}>
                <AnsEditor>
                  <Editor>
                    <img
                      src={`https://placeimg.com/200/100/people/${1}`}
                      alt="practice"
                    />
                    <p>{username ? username : '답변자'}</p>
                  </Editor>
                  <EditInfo>
                    <span>
                      {createdAt
                        ? `${timeForToday(createdAt)}`
                        : `${timeForToday(new Date())}`}
                    </span>
                  </EditInfo>
                </AnsEditor>
                <Context>{body ? body : 'done'}</Context>
                <PostHanddle>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenModal(true);
                      setModalType('Answer');
                      setAnswerid(answerId);
                      setAnswerbody(body);
                    }}
                  >
                    Edit
                  </button>
                  <div className="round"></div>
                  <button
                    type="submit"
                    onClick={() => {
                      axios
                        .delete(`${AnswersUrl}/${answerId}`)
                        .then(res => console.log(res));
                    }}
                  >
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

const AnswerBody = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  & > span {
    font-size: var(--font-size-h3);
    color: var(--black-001);
  }
`;
export default BoardDetail;
