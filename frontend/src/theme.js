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
    heading: "'Capsuula', Helvetica, sans-serif"
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
        margin: 0;
    }
    html {
        box-sizing: border-box;
    }
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }
`;

export default theme;
