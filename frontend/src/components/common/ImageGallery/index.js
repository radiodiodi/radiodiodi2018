import React, { Component } from 'react';
import styled from 'styled-components';

import Person from './Person';
import mikko from '../../../images/mikko.jpg';
import jan from '../../../images/jan.jpg';
import veikka from '../../../images/veikka.jpg';
import juuso from '../../../images/juuso.jpg';
import marika from '../../../images/marika.jpg';
import aajii from '../../../images/aajii.jpg';
import eero from '../../../images/eero.jpg';

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

const people = [
  { name: 'Juuso',  role: 'editorinchief',              img: juuso,     css: 'transform: rotate(-5deg)' },
  { name: 'Jan',    role: 'itdirector',                 img: jan },
  { name: 'Aajii',  role: 'executivedirector',          img: aajii },
  { name: 'Veikka', role: 'headofstudio',               img: veikka },
  { name: 'Make',   role: 'socialmediamanager',         img: marika },
  { name: 'Eero',   role: 'broadcastengineer',          img: eero },
  { name: 'Mikko',  role: 'corporaterelationsmanager',  img: mikko },
];

class ImageGallery extends Component {
  render() {
    return (
      <Gallery>
        <GalleryInner>
          { people.map((person, index) =>
            <Person key={index} {...person} />) }
        </GalleryInner>
      </Gallery>
    );
  }
}

export default ImageGallery;
