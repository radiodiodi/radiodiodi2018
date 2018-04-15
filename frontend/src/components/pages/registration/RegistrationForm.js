import React, { Fragment, Component } from 'react';
import styled from 'styled-components';

import {
  registerProgramme,
} from '../../../utils';

import {
  TextInput,
  TextArea,
  RadioButton,
  SubmitButton,
  ErrorLabel,
  PropositionPicker,
  CheckBox,
} from '../../common/Form';

const ResponseMessage = styled.h4`
  color: ${p => p.theme.color.pink};
  margin-bottom: 1rem;
`

const Link = styled.a`
  color: ${p => p.theme.color.pink};
`;

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propositions: [],
      sent: false,
      duration: 1,
      participants: 1,
    };
    this.handler = this.handler.bind(this);
    this.propositionHandler = this.propositionHandler.bind(this);
    this.checkboxHandler = this.checkboxHandler.bind(this);
    this.submit = this.submit.bind(this);
  }

  handler(key, value) {
    this.setState(state => ({ ...state, [key]: value }));
  }

  checkboxHandler(key, option, value) {
    this.setState(state => ({ 
      ...state, 
      [key]: {
        ...state[key],
        [option]: value,
      }
    }));
  }

  propositionHandler(key, value) {
    const obj = {
      ...this.state[key],
      ...value,
    };

    Object.keys(obj).forEach((key) => (obj[key] == null) && delete obj[key]);
    this.setState(state => ({ ...state, [key]: obj}));
  }

  async submit(e) {
    const requiredKeys = [
      'name',
      'team',
      'responsible',
      'email',
      'participants',
      'producer',
      'propositions'
    ];
    const { state } = this;
    const missing = requiredKeys.filter(key => state[key] === undefined);
    if (missing.length === 0 && state.propositions && Object.keys(state.propositions).length > 0) {
      const data = {
        ...state,
        propositions: Object.values(state.propositions),
        photoshoot: state.photoshoot ? Object.keys(state.photoshoot) : [],
      };
      const ok = await registerProgramme(data);
      if (ok) {
        this.setState({ ...state, errors: null, sent: true });
      } else {
        this.setState(state => ({ ...state, errors: 'server-error' }));
      }
    } else {
      this.setState(state => ({ ...state, errors: 'missing-fields' }));
    }
  }

  render() {
    const { handler, propositionHandler, checkboxHandler, submit } = this;
    if (this.state.sent) {
      return (
        <Fragment>
        <ResponseMessage>
        Kiitos ilmoittautumisesta! Olemme yhteydessä lähiaikoina.<br />
        </ResponseMessage>
        <ResponseMessage>
        Ohjelmantekijät kuvataan 4.4. ja 5.4. OUBS-studiolla. Jos jäi kysymyksiä, vastauksia löytyy postilokerosta <Link href="mailto:toimitus@radiodiodi.fi">toimitus@radiodiodi.fi.</Link>
        </ResponseMessage>
        </Fragment>
      );
    }
    return (
      <form>
        <TextInput id="name" label="Ohjelman nimi" req handler={handler} />
        <TextArea 
          id="description" 
          label="Ohjelman kuvaus" 
          placeholder="Miten markkinoisit ohjelmaasi radion kuuntelijoille? Tämä tulee näkyviin ohjelmakalenteriin sen julkaisun jälkeen. Maksimissaan 400 merkkiä."
          req
          maxlength="400"
          handler={handler} 
        />
        <TextInput id="team" label="Esiintyjä (tiimi)" req handler={handler} />
        <TextInput
          id="responsible"
          label="Vastuuhenkilö"
          req
          handler={handler}
        />
        <TextInput
          id="email"
          label="Vastuuhenkilön sähköpostiosoite"
          type="email"
          req
          handler={handler}
        />
        <TextInput id="genre" label="Genre" handler={handler} />
        <TextInput
          id="participants"
          label="Osallistujien (arvioitu) määrä"
          type="number"
          req
          handler={handler}
          min="1"
          value={this.state.participants}
        />
        <TextInput
          id="duration"
          label="Ohjelman kesto (tunneissa)"
          type="number"
          req
          handler={handler}
          min="1"
          max="24"
          value={this.state.duration}
        />
        <TextArea 
          id="info"
          placeholder="Kysymyksiä toimitukselle? Erityisiä toiveita lähetykseen liittyen? Muita toiveita? Tänne vaan." 
          label="Lisätietoja"
          handler={handler} 
        />
        <RadioButton
          id="producer"
          label="Tuottaja"
          options={[
            'Minulla on tuottaja',
            'Tarvitsen tuottajan',
            'En tiedä mitä tämä tarkoittaa'
          ]}
          req
          handler={handler}
        />
        <p>Valitse alta kaikki sopivat aikavälit ohjelmallesi. Aikavälit eivät merkkaa ohjelmasi kestoa, vaan sitä, milloin voit pitää ohjelmasi.</p>
        <PropositionPicker
          id="propositions"
          label="Ohjelma-aikaehdotukset"
          req
          propositions={Object.values(this.state.propositions)}
          handler={propositionHandler}
        />
        <p>Pyrimme kuvaamaan kaikki ohjelmantekijät ohjelmakalenteria varten. Valokuvaustilaisuus järjestetään 4.4. ja 5.4. OUBS-studiolla.</p>
        <CheckBox
          id="photoshoot"
          label="Valokuvausaika"
          options={[
            '4.4.',
            '5.4.',
          ]}
          handler={checkboxHandler}
        />
        <p>Jos haluat ilmoittautua tuottajaksi, laita viestiä osoitteeseen <Link href="mailto:studio@radiodiodi.fi">studio@radiodiodi.fi!</Link></p>
        <p>Jos jäi kysymyksiä, vastauksia löytyy postilokerosta <Link href="mailto:toimitus@radiodiodi.fi">toimitus@radiodiodi.fi.</Link></p>
        {this.state.errors === 'missing-fields' ? <ErrorLabel>Pakollisia kenttiä puuttuu. Tarkista lomake.</ErrorLabel> : null}
        {this.state.errors === 'server-error' ? <ErrorLabel>Lomakkeen lähetys epäonnistui. Syötithän oikean sähköpostiosoitteen?</ErrorLabel> : null}
        <SubmitButton handler={submit} />
      </form>
    );
  }
}
