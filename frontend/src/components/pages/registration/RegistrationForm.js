import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
} from '../../common/Form';

const ResponseMessage = styled.h4`
  color: ${p => p.theme.color.pink};
`

const Link = styled.a`
  color: ${p => p.theme.color.pink};
`;

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propositions: [],
    };
    this.handler = this.handler.bind(this);
    this.propositionHandler = this.propositionHandler.bind(this);
    this.submit = this.submit.bind(this);
  }

  handler(key, value) {
    this.setState(state => ({ ...state, [key]: value }));
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
      };
      const ok = await registerProgramme(data);
      if (ok) {
        this.setState({ ...state, errors: null, sent: true });
      } else {
        this.setState(state => ({ ...state, errors: ['Failed to register programme!'] }));
      }
    } else {
      this.setState(state => ({ ...state, errors: 'missing-fields' }));
    }
  }

  render() {
    const { handler, propositionHandler, submit } = this;
    if (this.state.sent) {
      return <ResponseMessage>Kiitos ilmoittautumisesta! Olemme yhteydessä lähiaikoina.</ResponseMessage>
    }
    return (
      <form>
        <TextInput id="name" label="Ohjelman nimi" req handler={handler} />
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
        />
        <TextInput
          id="duration"
          label="Ohjelman kesto (tunneissa)"
          type="number"
          req
          handler={handler}
        />
        <TextArea id="info" label="Lisätietoja" handler={handler} />
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
        <PropositionPicker
          id="propositions"
          label="Ohjelma-aikaehdotukset"
          req
          propositions={Object.values(this.state.propositions)}
          handler={propositionHandler}
        />
        <p>Jos haluat ilmoittautua tuottajaksi, laita viestiä osoitteeseen <Link href="mailto:studio@radiodiodi.fi">studio@radiodiodi.fi!</Link></p>
        {this.state.errors === 'missing-fields' ? <ErrorLabel>Pakollisia kenttiä puuttuu. Tarkista lomake.</ErrorLabel> : null}
        <SubmitButton handler={submit} />
      </form>
    );
  }
}
