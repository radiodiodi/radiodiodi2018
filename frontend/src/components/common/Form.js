import React from 'react';
import styled from 'styled-components';

import DatePicker from './PropositionPicker';

const Text = styled.div`
  display: inline-block;
  width: ${p => (p.full ? '100%' : '50%')};
  @media (max-width: 800px) {
    width: 100%;
  }
  padding: 10px;
  margin-bottom: 1rem;
  vertical-align: top;
  
  input:not([type='radio']):not([type='checkbox']),
  textarea {
    background-color: ${p => p.theme.color.white};
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    border: none;
    font-size: 1.1rem;
  }
  ${p => (p.req ? `& > label:after { content: '*'; }` : '')};
`;

const Label = styled.label`
  display: block;
  color: #ccc;
  font-size: 0.9rem;
`;

const Button = styled.input`
  padding: 1rem;
  margin: 1rem 0 2rem;
  width: 100%;
  background-color: ${p => p.theme.color.pink};
  font-family: 'Comfortaa';
  font-size: 1rem;
  border: 0;
`;

const Radio = styled.div`
  margin: 10px;
  * {
    padding: 10px;
  }
`;

export const ErrorLabel = styled.p`
  color: ${p => p.theme.color.yellow};
  text-align: center;
`

export function TextInput({ id, label, type = 'text', req, handler, ...others }) {
  return (
    <Text req={req}>
      <Label>{label}</Label>
      <input type={type} onChange={e => handler(id, e.target.value)} {...others} />
    </Text>
  );
}

export function TextArea({ id, label, rows = 5, req, handler, placeholder, maxlength }) {
  return (
    <Text full={true} req={req}>
      <Label>{label}</Label>
      <textarea rows={rows} maxlength={maxlength} placeholder={placeholder} onChange={e => handler(id, e.target.value)} />
    </Text>
  );
}

export function RadioButton({
  id,
  label,
  options,
  name = 'radio',
  req,
  handler
}) {
  return (
    <Text req={req}>
      <Label>{label}</Label>
      {options.map((option, index) => (
        <Radio key={option}>
          <input
            type="radio"
            id={option}
            name={name}
            onChange={e => handler(id, option)}
          />
          <label htmlFor={option}>{option}</label>
        </Radio>
      ))}
    </Text>
  );
}

export function CheckBox({
  id, label, options, handler, req,
}) {
  return (
    <Text req={req}>
      <Label>{label}</Label>
      {options.map((option, index) => {
        return (
          <Radio key={option}>
            <input
              type="checkbox"
              id={option}
              name={`${id}-${option}`}
              onChange={e => handler(`${id}`, option, e.target.checked)}
            />
            <label htmlFor={option}>{option}</label>
          </Radio>
        );
      })}
    </Text>
  );
}

export function PropositionPicker({id, req, label, handler, propositions}) {
  return (
    <Text full req={ req }>
      <Label>{ label }</Label>
      <DatePicker propositions={propositions} handler={propos => handler(id, propos)} />
    </Text>
  );
}

export function SubmitButton({ text = 'Lähetä', handler }) {
  return <Button type="button" onClick={handler} value={text} />;
}
