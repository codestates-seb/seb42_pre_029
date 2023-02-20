import styled from 'styled-components';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

function MainLayout({ sideBar, children }) {
  return (
    <>
      <Header />
      <ContentContainer>
        {sideBar && <SideBar />}
        <main>{children}</main>
      </ContentContainer>
      <Footer />
    </>
  );
}

const ContentContainer = styled.div`
  display: flex;
  margin: 0 auto;
  height: 100vh;
  max-width: 1140px;
  & > main {
    flex-grow: 1;
    padding: 60px;
  }
`;

export default MainLayout;
