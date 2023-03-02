import { useState } from 'react';
import styled from 'styled-components';

function Vote() {
  const [Votes, setVotes] = useState(0);

  const votesHandller = e => {
    let value = e.target.className;
    let num = Votes;
    value === 'votesUp' ? (num += 1) : (num -= 1);
    setVotes(num);
  };

  return (
    <VotesControl>
      <button onClick={e => votesHandller(e)}>
        <div className="votesUp"></div>
      </button>
      <span>{Votes}</span>
      <button onClick={e => votesHandller(e)}>
        <div className="votesDown"></div>
      </button>
    </VotesControl>
  );
}

// vote 기능 css
const VotesControl = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
  & > button {
    background: none;
    & > .votesUp {
      width: 0px;
      height: 0px;
      border-bottom: 18px solid var(--black-005);
      border-left: 24px solid transparent;
      border-right: 24px solid transparent;
      cursor: pointer;
      margin-bottom: 10px;
    }
  }
  & > span {
    font-size: var(--font-size-h4);
    color: var(--black-004);
    text-align: center;
  }

  & > button {
    background: none;
    & > .votesDown {
      width: 0px;
      height: 0px;
      border-top: 18px solid var(--black-005);
      border-left: 24px solid transparent;
      border-right: 24px solid transparent;
      cursor: pointer;
      margin-top: 10px;
    }
  }
`;

export default Vote;
