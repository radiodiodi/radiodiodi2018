import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CountdownSection from '../../common/CountdownSection';
import {
  TextInput,
  TextArea,
  RadioButton,
  SubmitButton
} from '../../common/Form';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const Paragraph = styled.div`
  max-width: 50%;
  margin: 0;
  color: ${p => p.theme.color.white};
  @media screen and (max-width: 800px) {
    max-width: 100%;
  }
`;

const Paragraph2 = Paragraph.extend`
  margin-bottom: 10px;
  max-width: initial;
  max-width: 800px;
`;

const Title = styled.h3`
  margin: 0;
  height: 4rem;
`;

const ContentRow = styled.div`
  padding: 2rem 0;
  margin: 2rem 0;
  border-bottom: solid;
  border-top: solid;
  border-width: 2px;
  border-color: ${p => p.theme.color.pink};

  @media screen and (max-width: 800px) {
    margin-top: 2rem;
  }
`;

class Registration extends Component {
  static contextTypes = {
    trans: PropTypes.any
  };

  render() {
    const sponsorInterval = 3000; // milliseconds
    const { trans } = this.context;

    return (
      <Fragment>
        <CountdownSection />
        <Container>
          <Paragraph>
            <Title>{trans.registration}</Title>
            <form>
              <TextInput label="Ohjelman nimi" />
              <TextInput label="Esiintyjä (tiimi)" />
              <TextInput label="Vastuuhenkilö" />
              <TextInput label="Vastuuhenkilön sähköpostiosoite" type="email" />
              <TextInput label="Genre" />
              <TextArea label="Lisätietoja" />
              <RadioButton
                label="Tuottaja"
                options={[
                  'Minulla on tuottaja',
                  'Tarvitsen tuottajan',
                  'En tiedä mitä tämä tarkoittaa'
                ]}
              />
              <SubmitButton />
            </form>
          </Paragraph>
        </Container>
      </Fragment>
    );
  }
}

export default Registration;
