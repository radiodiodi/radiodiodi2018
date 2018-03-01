import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
  }

  handler(key, value) {
    this.setState(state => ({ ...state, [key]: value }));
  }

  submit() {}

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
        <SubmitButton onClick={submit} />
      </form>
    );
  }
}
