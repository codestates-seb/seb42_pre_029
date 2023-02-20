import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import variables from './variables';

const GlobalStyle = createGlobalStyle`
  ${variables}
  ${reset}

  *, *:before, *:after {
    box-sizing: border-box;
    border: none;
  }
  html, body {
    font-family: 'pretendard';
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
