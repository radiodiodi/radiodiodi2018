import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  padding: 0.5rem;
  color: ${p => p.theme.color.white};
`;

const Question = styled.i`
  &::before {
    content: '— ';
  }

  display: block;
  padding: 1rem 0 0.5rem;
`;

const Answer = styled.div`
  background-color: ${p => p.theme.color.contrast};
  padding: 1rem;
  
`;

const qas = trans => [
  {
    question: 'Mikä on Radiodiodi?',
    answer: 'Radiodiodi on Otaniemestä ponnistava joka vuosi täysin opiskelijavetoisesti toteutettu kaupallinen wappuradio. Radio toteutetaan vuonna 2018 jo seitsemättä kertaa ja lähetys on käynnissä täydet kaksi viikkoa ennen Wappuaattoa. Projektiin osallistuu joka vuosi satoja vapaaehtoisia taustatyön muodossa ja ohjelmaakin tulee vuosittain tekemään kahden lähetysviikon aikana yli 100 vapaaehtoista. Radiota kuuntelee lähetyksen aikana koko pääkaupunkiseutu ja verkossa koko Suomi!'
  },
  {
    question: 'Missä Radiodiodi kuuluu?',
    answer: 'Radiotaajuudella 105.8 MHz pääkaupunkiseudulla ja Suomen sisällä verkossa osoitteessa <a href="https://radiodiodi.fi">radiodiodi.fi</a>. Audiostriimin suora osoite on <a href="https://virta.radiodiodi.fi/radiodiodi-mp3.m3u">https://virta.radiodiodi.fi/radiodiodi-mp3.m3u</a>'
  }, {
    question: 'Missä radion kontit sijaitsevat?',
    answer: 'Kontit sijaitsevat Otaniemessä Alvarin aukiolla. Lähin osoite on Otakaari 11, Espoo. Tarkka sijainti on näkyvissä <a href="https://bit.ly/2HCEcGc">täältä</a>.'
  }, {
    question: 'Kuka voi tulla tekemään ohjelmaa?',
    answer: 'Kuka tahansa, joka ajan kerkeää varaamaan. :) Aikataulukonflikteissa priorisoimme opiskelijoita.'
  },
  {
    question: 'I want to do a program in English.Is that possible?',
    answer: 'Naturally! Shoot us a mail to toimitus@radiodiodi.fi and we\'ll be happy to explain how everything works.'
  },
  {
    question: 'Sopiiko ideani wappuradioon ohjelmaksi?',
    answer: `Jos se ei riko lakia ja voisi mahdollisesti kiinnostaa jotakuta, kyllä!

    <p>Radiodiodissa on sisällöllisesti ollut ohjelmaa saatananpalvonnasta kristilliseen ohjelmaan ja musiikin analysoinnista tarinankerrontaan.</p>

    <p>Teknisesti ohjelma voi sisältää vaikkapa puhetta, nauhalta soitettua musiikkia, livemusiikkia, freestyleräppiä, DJ-settejä ja ääniefektejä.</p>

    <p>Huom: Jos ohjelma sisältää jotakin muuta kuin musiikin soittamista ja puhumista, ota yhteyttä etukäteen, jotta toimitus voi valmistella studion erikoisempaa ohjelmaa varten. Autamme mielellämme typerienkin ideoidesi toteuttamisessa.</p>
  `}, {
    question: 'Kuinka monta ihmistä lähetykseen mahtuu?',
    answer: 'Studion lähetyspöydän ympärille mahtuu kerralla mukavasti 8-10 ihmistä. Mikrofonilliset headsetit löytyvät kuudelle henkilölle, ja kondensaattorimikrofoneilla isompikin porukka saadaan ääneen. Studion voi tunkea täyteen ihmisiä, mutta kannattaa miettiä, onko se tarkoituksenmukaista.Useampi ihminen ei voi puhua toistensa päälle, jos puheesta on tarkoitus saada selvää.'
  },
  {
    question: 'Mitä musiikkia voin soittaa?',
    answer: 'Kaikkea laillisesti hankittua musiikkia, kuten CD-levyt, vinyylit, kasetit ja itse tuotetut teokset. Myös mm. Suomen iTunesista tai Bandcampista ostetut kappaleet käyvät. Suoratoistopalvelut eivät ole hyväksyttävä lähde. Esimerkiksi Spotify tai Youtube eivät siis valitettavasti ole käytettävissä. Jos haluat omat levysi meidän levytietokantaan helposti soitettavaksi, tuo ne radion konteille kopioitavaksi vähintään 3 päivää ennen omaa ohjelmaasi. Muista pyytää omat levysi takaisin ohjelmasi jälkeen. Lisäkysymyksiin saa vastauksen laittamalla mailia toimitus@radiodiodi.fi.'
  },
  {
    question: 'Mitä en saa tehdä radiossa?',
    answer: 'Älä soita yllämainittuja laittomia sisältöjä, äläkä ole idiootti. Näillä pääsee pitkälle.'
  },
  {
    question: 'Mitä teknisiä mahdollisuuksia konteilla on?',
    answer: `<p>Ohjelmantekijöille on mikrofonilliset headsetit kuudelle henkilölle ja 2 kondensaattorimikrofonia, joita voidaan käyttää laajemmalta alueelta.Konkkamikit ottavat ääntä laajalta alalta, joten ne toimivat hyvin vaikka laulamiseen, akustiseen soittamiseen tai isommalle porukalle puheohjelmaan.</p>

<p>Tämän lisäksi studiossa on laajat mahdollisuudet toistaa ääntä. Muun muassa:</p>
<ul>
<li>Kaikkea meidän <a href="https://radiodiodi.fi/library">musiikkikannassa</a> olevaa musiikkia voi soittaa tuottajakoneelta</li>
<li>DJ - mikseri kahdella CD- deckilläja kahdella vinyylideckillä</li>
<li>C-kasettisoitin</li>
<li>Oman tietokoneen saa kiinni USB- kaapelilla</li>
</ul>
HUOM: Omalta muistitikulta ei voi soittaa suoraan musiikkia, jos et käytää omaa tietokonettasi! Tuottajakoneeseen ei saa kytkeä mitään ylimääräisiä laitteita.

<p>Myös analogiset liitännät omiin laitteisiin, livemusiikki ja kaikenlaiset outoudet onnistuvat – esimerkiksi Kimble-laudan naksuttelu on saatu kuulumaan lähetykseen. Jos teet mitään muuta kuin pelkkää puheohjelmaa tai valmiista äänilähteistä soittamista, ota aina yhteyttä etukäteen. Ota myös rohkeasti yhteyttä, jos et ole jostain asiasta varma. Studiotiimin saa kiinni osoitteesta studio@radiodiodi.fi</p>`
  }, {
    question: 'Miten se koko homma toimii käytännössä?',
    answer:
    `Ennen lähetyspäivää:
<ul>
<li>Suunnittele ohjelmasi! Hyvin suunniteltua ohjelmaa on mukava tehdä lähetyspäivänä.</li>
<li>Ohjelmaa suunnitellessa varaa mainoksille ja jingleille yhteensä n. 5 minuuttia per tunti</li>
<li>Varmista, että haluamasi musiikki on <a href="/library">soitettavissa lähetyksessä</a> ja tuo tarpeelliset mediat konteille etukäteen</li>
</ul>
Lähetyspäivänä:
<ul>
<li>Ole paikalla vähintään 15 minuuttia ennen lähetyksesi alkua</li>
<li>Tule lämpiöön, eli keskimmäiseen konttiin (osoite)</li>
<li>Lähetyksesi tuottajan pitäisi olla siellä odottamassa. Jos ketään ei tule paikalle 5 minuuttia ennen lähetystä, kurkkaa varovasti studiokonttiin</li>
<li>Tuottaja selittää käytännön asiat </li>
<li>Varaudu lopettamaan puhuminen noin 5 min.ennen oman ohjelmasi loppua. Laita tällöin myös musiikkia jonoon, jotta seuraavat tekijät pääsevät valmistautumaan ajoissa.</li>
<li>Kerää tavarasi</li>
<li>Pyydä kopioitavaksi tuomasi levyt takaisin</li></ul>`
  }, {
    question: 'Onko ohjelmantekijöille ruokaa tai juomaa talon puolesta?',
    answer: 'BTWTonic tarjoaa pullollisen toniciaan jokaiselle ohjelmantekijälle. Pidemmille ohjelmasessioille kannattaa varata omaa evästä mukaan.'
  }, {
    question: 'Saako studiossa syödä/juoda? Entä alkoholi?',
    answer: 'Kunhan laitteet pysyvät ehjänä ja kunnossa, mikään ei estä studiossa syömistä tai juomista.'
  }, {
    question: 'Miten mainosten soittaminen tapahtuu?',
    answer: 'Kaikissa päiväaikaan lähetettävissä ohjelmissa soitetaan mainoksia. Tuottaja huolehtii näiden soittamisesta käytännössä, mutta varaathan ohjelmastasi yhteensä n. 5 minuuttia tunnissa mainoksille ja jingleille.'
  }, {
    question: 'Mikä on jingle?',
    answer: 'Jingle on lyhyt audiopätkä, jossa kerrotaan mitä radioasemaa kuuntelet. Esimerkkinä "Kuuntelet Radio Novaa taajudella 106.2” Näitäkin soitetaan oman ohjelman ohessa tuottajan toimesta; yleensä mainosten yhteydessä.'
  }, {
    question: 'Voinko äänittää jinglen omalle ohjelmalleni?',
    answer: 'Kyllä! Voit nauhoittaa sen itse ja lähettää meille etukäteen. Ota yhteyttä studio@radiodiodi.fi jos tämä kiinnostaa.'
  }, {
    question: 'Saanko ohjelmani talteen jotenkin?',
    answer: 'Meidän puolelta ei ole mahdollista saada ohjelmien nauhoituksia jälkikäteen.'
  }, {
    question: 'Voinko tehdä etälähetyksen?',
    answer: 'Tämäkin on mahdollista. Ilmoita tästä etukäteen studio@radiodiodi.fi niin katsotaan miten tämä onnistuu.'
  }, {
    question: 'Kuka on tuottaja?',
    answer: 'Tuottaja vastaa lähetyksen teknisestä puolesta, jotta tekijät saat keskittyä itse ohjelman tekemiseen. Hän huolehtii mm. mikrofonien äänenvoimakkuudesta sekä jinglejen, mainoksien ja musiikin soittamisesta. Hän on studiossa paikalla ja voi myös osallistua ohjelmantekoon, tai tehdä ohjelmaa kokonaan itse. Kaikista näistä voi sopia konteilla tuottajan kanssa ennen lähetystä.'
  }, {
    question: 'Mitä jos minulla ei ole tuottajaa ohjelmalleni?',
    answer: 'Mainitse tästä, kun ilmoittaudut tekemään ohjelmaa. Toimitus järjestää paikalle tuottajan. Jos unohdit mainita asiasta, ota yhteyttä toimitus@radiodiodi.fi.'
  }, {
    question: 'Minua voisi kiinnostaa tuottaminen. Mistä saan tietää siitä lisää?',
    answer: 'Laita sähköpostia studio@radiodiodi.fi. Tuottajakoulutuksia järjestetään kiinnostuneille studion rakennusviikolla ja ensimmäisen lähetysviikon aikana.'
  }, {
    question: 'Voinko tehdä jotain muuta lähetyksen eteen?',
    answer: 'Ehdottomasti! Radiodiodin eteen tehdään ympäri vuotta monenlaista hommaa ja erityisesti huhtikuussa on konteilla paljon tekemistä. Joka vuonna projektissa tarvitaan monialaista osaamista: äänitekniikkaa, yrityssuhteita, markkinointia, rakennusta, lähetystekniikkaa, IT:tä sekä vaikka mitä muuta. Ota yhteyttä rekry@radiodiodi.fi tai tule ja nykäise meitä hihasta, jos sinua kiinnostaa olla mukana tänä tai ensi vuonna!'
  }
];

class FAQ extends Component {
  static contextTypes = {
    trans: PropTypes.any,
    faq: PropTypes.any
  };

  renderQuestionAndAnswer(question, answer, key) {
    return (
      <Fragment key={key}>
        <Question dangerouslySetInnerHTML={{ __html: question }} />
        <Answer dangerouslySetInnerHTML={{ __html: answer }} />
      </Fragment>
    );
  }

  render() {
    const { trans, faq } = this.context;

    return (
      <Container>
        <h3>{trans.faq}</h3>
        {qas(faq).map((qa, index) => this.renderQuestionAndAnswer(qa.question, qa.answer, index))}
      </Container>
    );
  }
}

export default FAQ;