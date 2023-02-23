import MainLayout from '../../components/MainLayout';
import Button from '../../components/Button';
import styled from 'styled-components';
import TextArea from '../../components/TextArea';
function BoardWrite() {
  return (
    <MainLayout>
      <BoardWriteHeader>
        <h1>Ask a public question</h1>
        <AskTip>
          <div className="tipTitle">
            <span>Writing a good question</span>
            <p>
              You’re ready to ask a programming-related question and this form
              will help guide you through the process. Looking to ask a
              non-programming question? See the topics here to find a relevant
              site.
            </p>
            ``
          </div>
          <div className="tipRule">
            <span>Steps</span>
            <ul>
              <li>Summarize your problem in a one-line title.</li>
              <li>Describe your problem in more detail.</li>
              <li>Describe what you tried and what you expected to happen.</li>
              <li>
                Add “tags” which help surface your question to members of the
                community.
              </li>
              <li>Review your question and post it to the site.</li>
            </ul>
          </div>
        </AskTip>
      </BoardWriteHeader>
      <BoardWriteBody>
        <TextField>
          <span>Title</span>
          <p>
            Be specific and imagine you’re asking a question to another person.
          </p>
          <TextArea
            placeholder={'title'}
            border={'1px solid var(--line-001)'}
            width={'100%'}
            margin={'20px 0 20px 0'}
            padding={'14px 0 0 14px'}
            borderRadius={'3px'}
            fontSize={'var(--font-size-md)'}
            fontColor={'var(--black-004)'}
          />
        </TextField>
        <TextField>
          <span>What are the details of your problem?</span>
          <p>
            Introduce the problem and expand on what you put in the title.
            Minimum 20 characters.
          </p>
          <TextArea
            placeholder={'What are the details of your problem?'}
            border={'1px solid var(--line-001)'}
            width={'100%'}
            height={'120px'}
            margin={'20px 0 20px 0'}
            borderRadius={'3px'}
            padding={'14px'}
            fontSize={'var(--font-size-md)'}
            fontColor={'var(--black-004)'}
          />
          <Button text={'Submit'} textColor={'white'} width={'80px'} />
        </TextField>
      </BoardWriteBody>
    </MainLayout>
  );
}

const BoardWriteHeader = styled.header`
  & > h1 {
    font-size: var(--font-size-h1);
    color: var(--black-001);
    font-weight: 600;
    margin-bottom: 40px;
  }
`;
const AskTip = styled.div`
  display: flex;
  flex-direction: column;
  width: 845px;
  background-color: #edf4fa;
  border: 1px solid #aecdea;
  border-radius: 8px;
  padding: 24px;
  & > .tipTitle {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    > span {
      font-size: var(--font-size-h5);
      color: var(--black-001);
      font-weight: 500;
      margin-bottom: 12px;
    }
    > p {
      line-height: 20px;
      color: var(--black-002);
    }
  }
  & > .tipRule {
    display: flex;
    flex-direction: column;
    > span {
      font-size: var(--font-size-h6);
      color: var(--black-001);
      font-weight: 500;
      margin-bottom: 12px;
    }
    > ul {
      padding-left: 30px;
      list-style: disc;
      > li {
        color: var(--black-002);
        margin-bottom: 8px;
      }
      > :last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const BoardWriteBody = styled.main`
  display: flex;
  flex-direction: column;
  width: 845px;
`;

const TextField = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--line-002);
  border-radius: 8px;
  padding: 24px;
  margin-top: 20px;
  background: white;
  > span {
    font-size: var(--font-size-h6);
    color: var(--black-001);
    font-weight: 500;
    margin-bottom: 12px;
  }
  > p {
    color: var(--black-004);
  }
`;
export default BoardWrite;
