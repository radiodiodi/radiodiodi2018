import LocalizedStrings from 'react-localization';
import Cookies from 'universal-cookie';

const trans = new LocalizedStrings({
  fi: {
    frontpage: 'Etusivu',
    changelang: 'In English',
    forbusinesses: 'Yrityksille',
    instagramfeed: '#Instagram-feed',
    failedtoloadimages: 'Instagram-kuvien lataus epäonnistui!',
  },
  en: {
    frontpage: 'Front page',
    changelang: 'Suomeksi',
    forbusinesses: 'For businesses',
    instagramfeed: '#Instagram Feed',
    failedtoloadimages: 'Failed to load Instagram images!',
  },
});

const cookies = new Cookies();
const lang = cookies.get('lang');
trans.setLanguage(lang || 'fi');

export default trans;