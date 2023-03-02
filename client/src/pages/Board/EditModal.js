import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

const EditModal = ({ open, onClose, name, dataTitle, dataBody, url }) => {
  const [title, setTitle] = useState(dataTitle);
  const [body, setBody] = useState(dataBody);
  if (!open) return null;

  const titleHandller = (e, func) => {
    func(e.target.value);
  };
  console.log(dataBody);

  const submit = () => {
    let data = {
      title: title,
      body: body,
      questionId: 1,
      memberId: 1,
    };

    if (name === 'Question') {
      data.questionId = undefined;
    } else if (name === 'Answer') {
      data.title = undefined;
    }
    axios
      .patch(url, data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <Overlay>
      <Layout>
        <button onClick={onClose} className="closeBtn" aria-label="Close">
          X
        </button>
        <Container>
          <h2>{`Edit Your ${name}`}</h2>
          {name === 'Question' ? (
            <TextField>
              <span>{`${name} Title`}</span>
              <TextArea
                border={'1px solid var(--black-006)'}
                width={'100%'}
                height={'100%'}
                margin={'15px 0 30px 0'}
                borderRadius={'3px'}
                padding={'10px 15px'}
                fontSize={'var(--font-size-md)'}
                fontColor={'var(--black-002)'}
                placeholder={dataTitle}
                value={title}
                onChange={e => titleHandller(e, setTitle)}
              />
            </TextField>
          ) : null}
          <TextField>
            <span>{`${
              name === 'Question'
                ? 'What are the details of your problem?'
                : 'Your Answer'
            } `}</span>
            <TextArea
              border={'1px solid var(--black-006)'}
              width={'100%'}
              height={'120px'}
              margin={'15px 0 30px 0'}
              borderRadius={'3px'}
              padding={'10px 15px'}
              fontSize={'var(--font-size-md)'}
              fontColor={'var(--black-002)'}
              placeholder={dataBody}
              value={body}
              onChange={e => titleHandller(e, setBody)}
            />
          </TextField>
          <Button
            type="submt"
            text={`Submit ${name}`}
            textColor={'#fff'}
            bgColor={'var(--main-002)'}
            width={'160px'}
            height={'40px'}
            fontSize={'var(--font-size-md)'}
            hover={'#f0820e'}
            active={'#d1710a'}
            onClick={submit}
          />
        </Container>
      </Layout>
    </Overlay>
  );
};
const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25);
  position: fixed;
  width: 100%;
  height: 100%;
`;

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  width: 530px;
  background: #ffffff;
  border-radius: 8px;
  padding-bottom: 34px;
  > button {
    font-size: var(--font-size-h5);
    color: #8b95a1;
    margin-left: auto;
    width: 40px;
    height: 40px;
    background: none;
  }
`;

const Container = styled.form`
  padding: 0 40px;
  > h2 {
    font-size: var(--font-size-h2);
    font-weight: 700;
    padding-bottom: 30px;
    border-bottom: 1px solid var(--line-003);
    margin-bottom: 30px;
  }
`;

const TextField = styled.div`
  > span {
    font-size: var(--font-size-h5);
    font-weight: 700;
  }
`;

export default EditModal;
