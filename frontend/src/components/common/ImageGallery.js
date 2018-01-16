import React from 'react';
import styled from 'styled-components';
import FadeImage from './FadeImage';

const Gallery = styled.section`
  color: white;
  padding: 1rem 0;
`;

const GalleryInner = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  max-width: 600px;
  margin: 0 auto;
`;

const Img = styled(FadeImage)`
  border-radius: 50%;
`;

const Guy = styled.div`
  @media screen and (max-width: 800px) {
    flex: 0 1 50%;
  }
  flex: 0 1 33%;
  text-align: center;
  margin: 1rem 0;
`;

const abaj = [
  { name: 'Juuso', role: 'Päätoimittaja', img: 'https://placehold.it/100x100' },
  { name: 'Jan', role: 'IT-päällikkö', img: 'https://placehold.it/100x100' },
  { name: 'Aajii', role: 'Toimituspäällikkö', img: 'https://placehold.it/100x100' },
  { name: 'Veikka', role: 'Studiopäällikkö', img: 'https://placehold.it/100x100' },
  { name: 'Make', role: 'Somevastaava', img: 'https://placehold.it/100x100' },
  { name: 'Eero', role: 'Lähetysketjupäällikkö', img: 'https://placehold.it/100x100' },
  { name: 'Mikko', role: 'Rahan mestari', img: 'https://placehold.it/100x100' },
];

function Person({ name, role, img }) {
  return (
    <Guy>
      <Img src={img} />
      <h3>{name}</h3>
      <span>{role}</span>
    </Guy>
  );
}

function ImageGallery() {
  return (
    <Gallery>
      <GalleryInner>{abaj.map((jab, index) =>
        <Person key={index} {...jab} />)}
      </GalleryInner>
    </Gallery>
  );
}

export default ImageGallery;
