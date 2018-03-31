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
  {
    question: trans.faquestion3,
    answer: trans.faanswer3,
  },
  {
    question: trans.faquestion4,
    answer: trans.faanswer4,
  },
  {
    question: trans.faquestion5,
    answer: trans.faanswer5,
  },
  {
    question: trans.faquestion6,
    answer: trans.faanswer6,
  },
  {
    question: trans.faquestion7,
    answer: trans.faanswer7,
  },
];

class FAQ extends Component {
  static contextTypes = {
    trans: PropTypes.any,
    faq: PropTypes.any
  };

  renderQuestionAndAnswer(question, answer, key) {
    return (
      <Fragment key={key}>
        <Question dangerouslySetInnerHTML={{__html: question}} />
        <Answer dangerouslySetInnerHTML={{__html: answer}} />
      </Fragment>
    );
  }

  render() {
    const { trans, faq } = this.context;

    return (
      <Container>
        <h3>{ trans.faq }</h3>
        { qas(faq).map((qa, index) => this.renderQuestionAndAnswer(qa.question, qa.answer, index)) }
      </Container>
    );
  }
}

export default FAQ;