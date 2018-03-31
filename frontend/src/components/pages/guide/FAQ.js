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
    question: trans.faquestion1,
    answer: trans.faanswer1,
  },
  {
    question: trans.faquestion2,
    answer: trans.faanswer2,
  },
];

class FAQ extends Component {
  static contextTypes = {
    trans: PropTypes.any
  };

  renderQuestionAndAnswer(question, answer, key) {
    return (
      <Fragment key={key}>
        <Question>{question}</Question>
        <Answer>{answer}</Answer>
      </Fragment>
    );
  }

  render() {
    const { trans } = this.context;

    return (
      <Container>
        <h3>{ trans.faq }</h3>
        { qas(trans).map((qa, index) => this.renderQuestionAndAnswer(qa.question, qa.answer, index)) }
      </Container>
    );
  }
}

export default FAQ;