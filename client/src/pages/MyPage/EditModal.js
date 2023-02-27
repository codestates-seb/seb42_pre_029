import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import styled from 'styled-components';

const EditModal = ({ open, onClose }) => {
  if (!open) return null;
  const handlePhoneNumChange = e => {
    const rawPhoneNum = e.target.value;
    const formattedPhoneNum = rawPhoneNum.replace(
      /(\d{3})(\d{4})(\d{4})/,
      '$1-$2-$3',
    );
    e.target.value = formattedPhoneNum;
  };
  const handleBirthDateChange = e => {
    const rawBirthDate = e.target.value;
    const formattedBirthDate = rawBirthDate.replace(
      /(\d{4})(\d{2})(\d{2})/,
      '$1.$2.$3',
    );
    e.target.value = formattedBirthDate;
  };
  return (
    <Overlay>
      <div className="modalContainer">
        <button onClick={onClose} className="closeBtn" aria-label="Close">
          X
        </button>
        <div className="h2">Edit your profile</div>
        <div className="content">
          <p>User Name</p>
          <TextArea
            border={'1px solid var(--black-006)'}
            width={'100%'}
            height={'100%'}
            margin={'15px 0 30px 0'}
            borderRadius={'3px'}
            padding={'10px 15px 0 15px'}
            fontSize={'var(--font-size-md)'}
            fontColor={'var(--black-002)'}
            placeholder={'Codestates'}
          />
          <p>Phone Number</p>
          <TextArea
            border={'1px solid var(--black-006)'}
            width={'100%'}
            height={'100%'}
            margin={'15px 0 30px 0'}
            borderRadius={'3px'}
            padding={'10px 15px 0 15px'}
            fontSize={'var(--font-size-md)'}
            fontColor={'var(--black-002)'}
            placeholder={'010-1234-5678'}
            onChange={handlePhoneNumChange}
          />
          <p>E-mail</p>
          <TextArea
            border={'1px solid var(--black-006)'}
            width={'100%'}
            height={'100%'}
            margin={'15px 0 30px 0'}
            borderRadius={'3px'}
            padding={'10px 15px 0 15px'}
            fontSize={'var(--font-size-md)'}
            fontColor={'var(--black-002)'}
            placeholder={'codestates@gmail.com'}
          />
          <p>Birth Date</p>
          <TextArea
            border={'1px solid var(--black-006)'}
            width={'100%'}
            height={'100%'}
            margin={'15px 0 50px 0'}
            borderRadius={'3px'}
            padding={'10px 15px 0 15px'}
            fontSize={'var(--font-size-md)'}
            fontColor={'var(--black-002)'}
            placeholder={'1990.00.00'}
            onChange={handleBirthDateChange}
          />
        </div>
        <div className="button">
          <Button
            text={'Delete Account'}
            textColor={'#fff'}
            bgColor={'var(--black-006)'}
            width={'6vw'}
            height={'40px'}
            fontSize={'var(--font-size-md)'}
            hover={'var(--black-004)'}
            active={'var(--black-003)'}
          />
          <Button
            text={'Submit Profile'}
            textColor={'#fff'}
            bgColor={'var(--main-002)'}
            width={'6vw'}
            height={'40px'}
            fontSize={'var(--font-size-md)'}
            hover={'#f0820e'}
            active={'#d1710a'}
          />
        </div>
      </div>
    </Overlay>
  );
};

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  width: 100%;
  height: 100%;

  & > .modalContainer {
    max-width: 600px;
    width: 100%;
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 50px 40px 50px 40px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
  }
  & .closeBtn {
    position: fixed;
    top: 35px;
    right: 30px;
    cursor: pointer;
    color: var(--black-004);
    font-weight: bold;
    font-size: var(--font-size-h3);
    background-color: white;
  }
  & .h2 {
    font-size: var(--font-size-h2);
    font-weight: bold;
    padding-bottom: 30px;
    border-bottom: 1px solid var(--line-001);
  }
  & .content {
    margin-top: 40px;
    & > p {
      font-size: var(--font-size-h5);
      font-weight: bold;
    }
  }
  & TextArea {
    ::-webkit-scrollbar {
      display: none;
    }
    ::placeholder {
      color: var(--black-006);
    }
  }
  & .button {
    display: flex;
    justify-content: center;
    & > Button {
      margin: 0 15px 0 15px;
    }
  }
`;

export default EditModal;
