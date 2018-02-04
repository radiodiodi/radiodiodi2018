import React from 'react';
import styled from 'styled-components';
import FadeImage from './FadeImage';
import mikko from '../../images/mikko.jpg';
import jan from '../../images/jan.jpg';
import veikka from '../../images/veikka.jpg';
import juuso from '../../images/juuso.jpg';
import marika from '../../images/marika.jpg';
import aajii from '../../images/aajii.jpg';
import eero from '../../images/eero.jpg';
import trans from '../Locale';

const Gallery = styled.section`
  color: white;
  padding: 1rem 0;
`;

const GalleryInner = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  max-width: 800px;
  margin: 0 auto;
`;

const Img = styled(FadeImage)`
  border-radius: 50%;
  border-style: solid;
  border-width: 4px;
  border-color: ${p => p.theme.color.contrast};
  max-width: 100%;
  ${p => p.css};
`;

const Guy = styled.div`
  padding: 0.5rem;
  width: calc(100% - 2rem);

  @media screen and (min-width: 500px) {
    width: calc((100% - 4rem) / 2);
  }

  @media screen and (min-width: 800px) {
    width: calc((100% - 6rem) / 3);
  }
  text-align: center;
`;

const abaj = [
  {
    name: 'Juuso',
    role: 'editorinchief',
    img: juuso,
    css: 'transform: rotate(-5deg)'
  },
  { name: 'Jan', role: 'itdirector', img: jan },
  { name: 'Aajii', role: 'executivedirector', img: aajii },
  { name: 'Veikka', role: 'headofstudio', img: veikka },
  { name: 'Make', role: 'socialmediamanager', img: marika },
  { name: 'Eero', role: 'broadcastengineer', img: eero },
  { name: 'Mikko', role: 'corporaterelationsmanager', img: mikko }
];

function Person({ name, role, img, css }) {
  return (
    <Guy>
      <Img alt={name} src={img} css={css} />
      <h4>{name}</h4>
      <span>{trans[role]}</span>
    </Guy>
  );
}

function ImageGallery() {
  return (
    <Gallery>
      <GalleryInner>
        {abaj.map((jab, index) => <Person key={index} {...jab} />)}
      </GalleryInner>
    </Gallery>
  );
}

export default ImageGallery;
