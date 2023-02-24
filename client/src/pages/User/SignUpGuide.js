import styled from 'styled-components';
import badge from '../../assets/badge.svg';
import question from '../../assets/question.svg';
import tag from '../../assets/tag.svg';
import vote from '../../assets/vote.svg';

function SignUpGuide() {
  return (
    <GuideContainer>
      <h1>Join the Stack Overflow community</h1>
      <GuideBlock>
        <img src={badge} alt="badge" /> Get unstuck — ask a question
      </GuideBlock>
      <GuideBlock>
        <img src={vote} alt="vote" /> Unlock new privileges like voting and
        commenting
      </GuideBlock>
      <GuideBlock>
        <img src={tag} alt="tag" /> Save your favorite tags, filters, and jobs
      </GuideBlock>
      <GuideBlock>
        <img src={question} alt="question" /> Earn reputation and badges
      </GuideBlock>
      <InformBlock>
        Collaborate and share knowledge with a private group for FREE.
        <br />
        <a href="https://stackoverflow.com/">
          Get Stack Overflow for Teams free for up to 50 users.
        </a>
      </InformBlock>
    </GuideContainer>
  );
}

const GuideContainer = styled.div`
  margin-right: 120px;
  & > h1 {
    font-size: var(--font-size-h3);
    font-weight: 600;
    margin-bottom: 40px;
  }
`;

const GuideBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  font-size: var(--font-size-lg);
  & > img {
    margin-right: 12px;
  }
`;

const InformBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 40px;
  margin-top: 240px;
  color: var(--black-003);
  & > a {
    color: var(--main-001);
    margin-top: 8px;
  }
`;

export default SignUpGuide;
