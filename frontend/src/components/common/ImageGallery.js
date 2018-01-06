import React from 'react';
import styled from 'styled-components';

const Gallery = styled.section`
  color: white;
  background-color: ${p => p.theme.color.blue};
  padding: 1rem 0;
`;

const GalleryInner = styled.div`
  display: flex;
  flex-flow: row wrap;
  max-width: 600px;
  margin: 0 auto;
`;

const Img = styled.img`border-radius: 50%;`;

const Guy = styled.div`
  flex: 0 1 33%;
  text-align: center;
  margin: 1rem 0;
`;

const abaj = [
  { name: 'Juuso', role: 'Päätoimittaja', img: 'https://placehold.it/100x100' },
  { name: 'Jan', role: 'IT-päällikkö', img: 'https://placehold.it/100x100' },
  {
    name: 'Aajii',
    role: 'Toimituspäällikkö',
    img: 'https://placehold.it/100x100'
  },
  {
    name: 'Veikka',
    role: 'Studiopäällikkö',
    img: 'https://placehold.it/100x100'
  }
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
      <GalleryInner>{abaj.map(jab => <Person {...jab} />)}</GalleryInner>
    </Gallery>
  );
}

export default ImageGallery;
