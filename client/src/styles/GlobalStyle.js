import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import variables from './variables';

const GlobalStyle = createGlobalStyle`
  ${variables}
  ${reset}

  *, *:before, *:after {
    box-sizing: border-box;
    border: none;
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
    font-family: 'pretendard';
  }
  html, body {
    font-size: var(--font-size-md);
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
