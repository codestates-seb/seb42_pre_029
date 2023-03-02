import { Route, Routes } from 'react-router-dom';
import BoardList from './pages/Board/BoardListPage';
import BoardDetail from './pages/Board/BoardDetailPage';
import BoardWrite from './pages/Board/BoardWritePage';
import MyPage from './pages/MyPage/MyPage';
import LogIn from './pages/User/LogInPage';
import SignUp from './pages/User/SignUpPage';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<BoardList />} />
        <Route path="/board-detail/:no" element={<BoardDetail />} />
        <Route path="/board-write" element={<BoardWrite />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
