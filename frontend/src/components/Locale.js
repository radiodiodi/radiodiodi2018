import LocalizedStrings from 'react-localization';
import Cookies from 'universal-cookie';

const trans = new LocalizedStrings({
  fi: {
    frontpage: 'Etusivu',
    changelang: 'In English',
    forbusinesses: 'Yrityksille',
    timetoregistration: 'Ohjelmantekijöiden ilmoittautuminen alkaa',
    registrationdate: '5.3. klo 9!',
    instagramfeed: '#Instagram-feed',
    failedtoloadimages: 'Instagram-kuvien lataus epäonnistui!',
    broadcastended: 'Lähetys jatkuu taas ennen Wappua!',
    tunein: 'Käännä radiosi taajuudelle 105,8 MHz 18.4.2018!',
    whatis: `Radiodiodi on Otaniemestä ponnistava joka vuosi täysin opiskelijavetoisesti toteutettu kaupallinen wappuradio. 
    Radio toteutetaan vuonna 2018 jo seitsemättä kertaa ja lähetys on käynnissä täydet kaksi viikkoa ennen wappuaattoa.
    Projektiin osallistuu joka vuosi satoja vapaaehtoisia taustatyön muodossa ja ohjelmaakin tulee vuosittain tekemään 
    kahden lähetysviikon aikana yli 100 vapaaehtoista. Radiota kuuntelee lähetyksen aikana koko pääkaupunkiseutu 
    ja lasketulla kuuluvuusalueella asuu noin 400 000 ihmistä!`,
    whatisheading: 'Mikä Radiodiodi?',
    instagramimage: 'Instagram-kuva',
    ancientromansquote: '“Suosittelen kokemuksena“',
    editorinchief: 'Päätoimittaja',
    itdirector: 'IT-päällikko',
    executivedirector: 'Toimituspäällikkö',
    headofstudio: 'Studiopäällikkö',
    socialmediamanager: 'Some-vastaava',
    broadcastengineer: 'Lähetysketjupäällikkö',
    corporaterelationsmanager: 'Yrityssuhdevastaava',
    incollaboration: 'Yhteistyössä',
    radioprogramheading: 'Ohjelmantekijäksi?',
    radioprogramparagraph1:
      'Radiodiodi tarvitsee sinua! Oletko aina haaveillut oman radio-ohjelman tekemisestä? Ai et vai? Ei se haittaa!',
    radioprogramparagraph2:
      'Radiodiodin ohjelma on aina ollut yhteisönsä tekemää ja näköistä. Lähetyskautemme aikana radiossa kuullaan satoja eri ääniä, joista yksi voit olla sinä. Ohjelmantekijäilmoittautuminen aukeaa 5.3. Lisätietoja ohjelman tekemisestä saa päätoimittajalta.'
  },
  en: {
    frontpage: 'Front page',
    changelang: 'Suomeksi',
    forbusinesses: ' ',
    timetoregistration: 'Show registration begins on',
    registrationdate: 'the 5th of March at 9 a.m.!',
    instagramfeed: '#Instagram Feed',
    failedtoloadimages: 'Failed to load Instagram images!',
    broadcastended: 'The broadcast will start again before Wappu!',
    tunein: 'Tune in to frequency 105.8 MHz on the 18th of April 2018!',
    whatis: `Radiodiodi is a commercial student-driven Wappu-season radio station based in Otaniemi. The station is being
    set up for the seventh time in 2018 and the broadcast will be live for a full two weeks right before the Wappu eve.
    Hundreds of volunteers take part in the project every year, mainly doing groundwork or hosting shows. The whole metropolitan
    area can listen to the broadcast; the signal covers more than 400 000 people!`,
    whatisheading: 'What is Radiodiodi?',
    instagramimage: 'Instagram image',
    ancientromansquote: '“Important quote here“',
    editorinchief: 'Editor in Chief',
    itdirector: 'IT Director',
    executivedirector: 'Executive Director',
    headofstudio: 'Head of Studio',
    socialmediamanager: 'Social Media Manager',
    broadcastengineer: 'Broadcast Engineer',
    corporaterelationsmanager: 'Corporate Relations Manager',
    incollaboration: 'In collaboration with',
    radioprogramheading: 'Ready to become a radio host?',
    radioprogramparagraph1:
      'Radiodiodi needs you! Have you always wanted to host your own radio show? No? Not a problem!',
    radioprogramparagraph2:
      'Radiodiodi looks and sounds like its community. During the broadcast period there are over a hundred different voices heard – and you can be one of them. The registration begins on March 5th. Contact the editor-in-chief for more info.'
  }
});

const cookies = new Cookies();
const lang = cookies.get('lang');
trans.setLanguage(lang || 'fi');

export default trans;
