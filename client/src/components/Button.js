import styled from 'styled-components';

const GlobalButton = styled.button`
  width: 5.71em;
  height: 3em;
  font-size: 0.86em;
  border: none;
  border-radius: 0.21em;
  &.skyblue {
    background-color: #e3ecf3;
    color: #83a6c4;
    border: 1px solid #83a6c4;
    :active {
      background-color: #b9d2e8;
      color: #83a6c4;
    }
  }
  &.blue {
    background-color: #4393f7;
    color: #fff;
    :active {
      background-color: #3172c6;
      color: white;
    }
  }
`;

function Button({ type, text, style }) {
  return (
    <>
      <GlobalButton className={`${style}`} type={type}>
        {text}
      </GlobalButton>
    </>
  );
}

export default Button;
