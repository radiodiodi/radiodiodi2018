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
  SubmitButton
} from '../../common/Form';

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handler = this.handler.bind(this);
    this.submit = this.submit.bind(this);
  }

  handler(key, value) {
    this.setState(state => ({ ...state, [key]: value }));
  }

  async submit(e) {
    const requiredKeys = [
      'name',
      'team',
      'responsible',
      'email',
      'participants',
      'producer'
    ];
    const { state } = this;
    const missing = requiredKeys.filter(key => state[key] === undefined);
    if (missing.length === 0) {
      const ok = await registerProgramme(state);
      console.log(state)
      ok && this.setState(state => ({ ...state, errors: ['Failed to register programme!'] }));
    } else {
      this.setState(state => ({ ...state, errors: missing }));
    }
    e.preventDefault;
  }

  render() {
    const { handler, submit } = this;
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
        <SubmitButton handler={submit} />
      </form>
    );
  }
}
