import React from 'react';
import styled from 'styled-components'

const Box = styled.div`
	position: absolute;
	top: 2px;
	left: 0;
	width: 30px;
	height: 30px;
  border: 2px solid ${p => p.theme.color.pink};
	background: ${p => p.theme.color.dark};

  &:after {
    position: absolute;
    display: none;
    content: '';
    top: 5px;
    left: 12px;
    width: 6px;
    height: 12px;
    transform: rotate(45deg);
    border: solid ${p => p.theme.color.pink};
    border-width: 0 2px 2px 0;
  }
`

const Input = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
`

const Label = styled.label`
  font-size: 18px;
  position: relative;
  display: block;
  margin-bottom: 15px;
  padding-left: 40px;
  line-height: 34px;
  cursor: pointer;

  &:hover ${Input} ~ ${Box},
  & ${Input}:focus ~ ${Box} {
    background: ${p => p.theme.color.blue};
  }
  & ${Input}:checked ~ ${Box} {
    background: ${p => p.theme.color.dark};
  }
  & ${Input}:checked ~ ${Box}:after {
    display: block;
  }
`

class PersistentCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // localStorage converts the value to string, this is how we unpack back to boolean
      checked: localStorage.getItem(this.props.k) === 'true'
    }
    this.handler = this.handler.bind(this);
  }
  handler() {
    const { checked } = this.state;
    this.setState({ checked: !checked });
    localStorage.setItem(this.props.k, !checked);
  }
  render() {
    const { k, title } = this.props;
    const { checked } = this.state;
    return (
      <div>
        <Label htmlFor={k}>
          {title}
          <Input type="checkbox" id={this.props.k} checked={checked} onChange={this.handler} />
          <Box />
        </Label>
      </div>
    )
  }
}

export default PersistentCheckbox;
