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
import RegistrationForm from './RegistrationForm';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const Paragraph = styled.div`
  color: ${p => p.theme.color.white};
  max-width: 800px;
  margin: auto;
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

const Form = styled.form`min-width: 500px;`;

class Registration extends Component {
  static contextTypes = {
    trans: PropTypes.any
  };

  render() {
    const { trans } = this.context;

    return (
      <Fragment>
        <Container>
          <Paragraph>
            <Title>{trans.registration}</Title>
            <h4>{trans.registrationopensat}</h4>
          </Paragraph>
        </Container>
      </Fragment>
    );
  }
}

export default Registration;
