import { injectGlobal } from 'styled-components';

const theme = {
  color: {
    pink: '#BD3E85',
    blue: '#182657',
    dark: '#121F40',
    yellow: '#D59B2D',
    brown: '#8D541E'
  },
  font: {
    heading: "'Capsuula', Helvetica, sans-serif",
    content: "'Comfortaa', cursive",
  }
};

injectGlobal`
    @font-face {
        font-family: 'Capsuula';
        font-weight: normal;
        font-style: normal;
        src: url(/font/Capsuula-webfont.woff) format('woff');
    }
    body {
        font-family: Helvetica, sans-serif;
        max-width: 800px;
        margin: 0 auto 0;
        padding: 1rem;
    }
    html {
        box-sizing: border-box;
        background-color: ${theme.color.dark};
        color: ${theme.color.pink};
        height: 100vh;
    }
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }
`;

export default theme;
