import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import styled from 'styled-components';

const EditModal = ({ open, onClose, title }) => {
  if (!open) return null;

  return (
    <Overlay>
      <Layout>
        <button onClick={onClose} className="closeBtn" aria-label="Close">
          X
        </button>
        <h2>{title}</h2>
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

const Layout = styled.section`
  display: flex;
  flex-direction: column;
  width: 530px;
  height: 671px;
  background: #ffffff;
  border-radius: 8px;
  > button {
    font-size: var(--font-size-h5);
    color: #8b95a1;
    margin-left: auto;
    width: 44px;
    height: 44px;
    background: none;
  }
  > h2 {
    font-size: var(--font-size-h2);
    font-weight: 700;
  }
`;
export default EditModal;
