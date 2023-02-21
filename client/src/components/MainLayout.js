import styled from 'styled-components';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

function MainLayout({ sideBar, children }) {
  return (
    <LayoutContainer>
      <Header />
      <ContentContainer>
        {sideBar && <SideBar />}
        <main>{children}</main>
      </ContentContainer>
      <Footer />
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  &:first-child {
    position: sticky;
    top: 0;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  margin: 0 auto;
  height: 100%;
  max-width: 1140px;
  min-height: 100vh;
  & > main {
    flex-grow: 1;
    padding: 60px;
    padding-right: 0px;
  }
`;

export default MainLayout;
