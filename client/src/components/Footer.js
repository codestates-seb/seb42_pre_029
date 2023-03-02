import styled from 'styled-components';
import logoDark from '../assets/logoDark.svg';
function Footer() {
  return (
    <FooterContainer>
      <img src={logoDark} alt="logo" />
      <Members>
        <Member
          href="https://github.com/gwoongchoi"
          target="_blank"
          rel="noopener noreferrer"
        >
          최지웅
        </Member>
        <Member
          href="https://github.com/Paksubeen"
          target="_blank"
          rel="noopener noreferrer"
        >
          박수빈
        </Member>
        <Member
          href="https://github.com/MODAC0"
          target="_blank"
          rel="noopener noreferrer"
        >
          김준희
        </Member>
        <Member
          href="https://github.com/adsds126"
          target="_blank"
          rel="noopener noreferrer"
        >
          김태형
        </Member>
        <Member
          href="https://github.com/JeeYulKim"
          target="_blank"
          rel="noopener noreferrer"
        >
          김지열
        </Member>
        <Member
          href="https://github.com/DerekYook"
          target="_blank"
          rel="noopener noreferrer"
        >
          육경득
        </Member>
      </Members>
      <Copyright>© Copyright ⓒ 2023 이구동성</Copyright>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 160px;
  background: #242629;
  color: white;
`;

const Members = styled.div`
  display: flex;
  margin-top: 32px;
`;

const Member = styled.a`
  color: var(--black-005);
  font-size: var(--font-size-sm);
  letter-spacing: 2px;
  padding: 0 8px;
  border-right: 1px solid var(--line-001);
  &:last-child {
    border: none;
  }
`;

const Copyright = styled.div`
  margin-top: 12px;
  color: var(--black-003);
  font-size: var(--font-size-sm);
`;

export default Footer;
