import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import vincit from '../../../audio/vincit.wav';
import srv from '../../../audio/srv.wav';
import gofore from '../../../audio/gofore.wav';

const Quote = styled.p`
    text-align: center;
    font-style: italic;
`;

const Source = styled.p`
    text-align: right;
    margin-right: 5rem;
`;

const Paragraph = styled.p`
  color: ${p => p.theme.color.white};
  text-align: ${p => p.centered ? 'center' : 'left'};
`;

const List = styled.ul`
  color: ${p => p.theme.color.white};
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
  justify-content: space-between;
`;

const Column = styled.span`
  padding: 1rem 0.5rem 1rem;
`;

const Link = styled.a`
  color: ${p => p.theme.color.white};
`;

const Title = styled.h2`
  text-align: left;
`;

const AudioPlayerContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const AudioPlayer = styled.span`
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem 1rem;

  @supports (-moz-appearance: none) {
    width: 30%;  /* fixes firefox width bug */
  }

  @media screen and (max-width: 700px) {
    width: 80%;
    flex-direction: row;
    justify-content: space-between;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;

const AudioPlayerLabel = styled.label`
  margin-bottom: 0.5rem;

  @media screen and (max-width: 700px) {
    margin-bottom: 0;
    align-self: center;
  }

  @media screen and (max-width: 500px) {
    margin-bottom: 0.5rem;
  }
`;

const ContrastBox = styled.div`
  background-color: ${p => p.theme.color.blue};
  padding: 0.5rem;
  margin: 2rem 0 1rem;
`;

class Sponsors extends Component {
  static contextTypes = {
    trans: PropTypes.any,
  }

  render() {
    const { trans } = this.context;

    return (
      <Fragment>
        <Quote>{ trans.ancientromansquote }</Quote>
        <Source>— Radiodiodi</Source>

        <Title>Wappuradio</Title>
        <Paragraph>Radiodiodi on Otaniemestä ponnistava wappuradio. Toimintamme pääpiste on kahden viikon pituinen radio-ohjelma huhtikuun puoliltavälin aina wappuaattoon asti. Lähetyksemme tuotetaan Otaniemessä, Alvarin aukiolla sijaitsevasta väliaikaisesta konttistudiosta.</Paragraph>
        <Paragraph>Radio-ohjelma tekevät vapaaehtoiset Aallon opiskelijat ja ohjelma onkin yleensä sen mukaista. Toimituksella ei ole ohjelman sisällöstä etukäteen tietoa - me luomme puitteet toiminnalle mutta ohjelmaa on täysin muiden käsissä.</Paragraph>
        <Paragraph>Teemme tätä yhteisön vuoksi; haluamme luoda kaikille riemukkaan wapputunnelman!</Paragraph>

        <Title>Yleisömme</Title>
        <Paragraph>Pääkohderyhmämme on Aalto-yliopiston nykyiset ja jo valmistuneet opiskelijat. Kauttamme tavoittaa parhaiten niin nuoret kuluttajat kuin rekryttävätkin. Tätä yleisöä et saa yhtenäisenä kuuntelijakuntana mistään muualta.</Paragraph>
        <Paragraph>Kuulumme kuitenkin koko pääkaupunkiseudulle FM taajuuksilla ja koko kuuluvuusalueellamme asuukin yhteensä yli miljoona ihmistä. Vaikka ohjelmaa tehdäänkin opiskelijat mielessä, on kuuntelijakuntamme tätä laajempaa.</Paragraph>
        <Paragraph>Kuuntelijoidemme lisäksi tavoitamme kaikki Radiodiodiin ohjemaa tekevät Aallon opiskelijat suoraan lähetyskontilla sekä erinäisissä koulutuksissa.</Paragraph>
        <Paragraph><i>Yleisömme odottaa erilaista sisältöä – emme edes pyri olemaan perinteinen radiokanava!</i></Paragraph>

        <Title>Mitä meillä on tarjolla yrityksille?</Title>

        <ColumnContainer>
          <Column>
          <h4>Lyhyitä mainosspotteja ja yhteisohjelmia</h4>
          <List>
            <li>Tarjoamme n. puolen minuutin pituisia radiomainoksia</li>
            <li>Tuotamme mainosspotit huomioiden sekä teidän toiveenne, että yleisömme odotukset</li>
            <li>Yhteisohjelma on 1 - 2 tunnin täysin vapaamuotoinen ohjelma, jonka tuottamisessa voimme avustaa</li>
          </List>
          </Column>
          <Column>
          <h4>Näkyvyyttä ja tapahtumia</h4>
          <List>
            <li>Logo verkossa ja julisteissamme</li>
            <li>Räätälöityjä somepostauksia</li>
            <li>Näkyvyyttä keskellä Otaniemen wappua lähetyskonteillamme</li>
            <li>Myös ohjelmantekijöiden erinäisiin tapahtumiin on mahdollista päästä mukaan </li>
          </List>
          </Column>
        </ColumnContainer>

        <Title>Aiempien vuosien mainoksia</Title>

        <AudioPlayerContainer>
          <AudioPlayer>
            <AudioPlayerLabel>Vincit</AudioPlayerLabel>
            <audio controls>
              <source src={ vincit } type="audio/wav" />
            </audio>
          </AudioPlayer>

          <AudioPlayer>
            <AudioPlayerLabel>SRV</AudioPlayerLabel>
            <audio controls>
              <source src={ srv } type="audio/wav" />
            </audio>
          </AudioPlayer>
        
          <AudioPlayer>
            <AudioPlayerLabel>Gofore</AudioPlayerLabel>
            <audio controls>
              <source src={ gofore } type="audio/wav" />
            </audio>
          </AudioPlayer>
        </AudioPlayerContainer>

        <ContrastBox>
          <Paragraph centered>
          Haluatteko olla osa Otaniemen wappua?
          </Paragraph>

          <Paragraph centered>
          Kerromme mielellämme lisää.
          </Paragraph>

          <Paragraph centered>
          <Link href="mailto:yrityssuhteet@radiodiodi.fi">yrityssuhteet@radiodiodi.fi</Link>
          </Paragraph>

          <Paragraph centered>
            +358 45 639 0790
          </Paragraph>
        </ContrastBox>

      </Fragment>
    );
  }
}

export default Sponsors;