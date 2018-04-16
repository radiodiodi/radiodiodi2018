import { injectGlobal } from 'styled-components';

const theme = {
  color: {
    pink: '#c75294',
    blue: '#182657',
    dark: '#121F40',

    yellow: '#D59B2D',
    brown: '#8D541E',
    white: '#EEE',
    contrast: 'rgba(255, 255, 255, 0.05)',
    shimmer: 'rgba(213, 155, 45, 0.3)',

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
        font-family: ${theme.font.content};
        letter-spacing: 0.5px;
        max-width: 1000px;
        margin: 0 auto 0;
        padding: 1rem 1rem 0 1rem;
        line-height: 1.3rem;
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
    h2 {
        text-align: center;
        line-height: 1.5em;
    }
    h3 {
        font-size: 2rem;
        line-height: 2em;
        color: ${theme.color.pink};
        margin: 1em 0 0;
        @media screen and (max-width: 400px) {
          font-size: 1.5rem;
        }
    }
    label {
        font-weight: 600;
    }
    a {
      color: ${theme.color.pink};
    }
`;

export default theme;
