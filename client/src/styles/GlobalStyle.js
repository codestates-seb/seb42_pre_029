import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
  font-family: 'pretendard';
  border: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
}
`;

export default GlobalStyle;
