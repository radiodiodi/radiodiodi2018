import React, { Component } from 'react';
import styled from 'styled-components';
import plus from '../../../images/plus.png';
import Proposition from './Proposition';

const Container = styled.div`
  margin: 10px;
`;

const PlusIcon = styled.img`
  max-width: 1rem;
  margin-right: 0.8rem;
`;

const AddButtonRow = styled.span`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  &:hover {
    color: ${p => p.theme.color.yellow};
  }
`;

class PropositionPicker extends Component {
  constructor() {
    super();
    this.onAddProposition = this.onAddProposition.bind(this);
    this.renderPropositions = this.renderPropositions.bind(this);
  }

  renderPropositions() {
    const { handler } = this.props;
    const rows = this.props.propositions.map((p, i) => <Proposition id={i} handler={handler} key={i} {...p} />);

    return (
      <div>
        { rows }
      </div>
    );
  }

  onAddProposition() {
    const { handler } = this.props;
    handler([
      ...this.props.propositions,
      { date: null, start_time: null, end_time: null},
    ]);
  }

  renderAddButton() {
    return (
      <AddButtonRow onClick={ this.onAddProposition }>
        <PlusIcon src={ plus } />
        <div>Lisää ehdotus</div>
      </AddButtonRow>
    );
  }

  render() {
    return (
      <Container>
        { this.renderPropositions() }
        { this.renderAddButton() }
      </Container>
    )
  }
}

export default PropositionPicker;