import React, { Fragment } from 'react';
import styled from 'styled-components';

const Text = styled.div`
  display: inline-block;
  width: ${p => (p.full ? '100%' : '50%')};
  padding: 10px;
  margin-bottom: 1rem;
  vertical-align: top;
  input:not([type='radio']),
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
  margin: 1rem;
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

export function TextInput({ id, label, type = 'text', req, handler }) {
  return (
    <Text req={req}>
      <Label>{label}</Label>
      <input type={type} onChange={e => handler(id, e.target.value)} />
    </Text>
  );
}

export function TextArea({ id, label, rows = 5, req, handler }) {
  return (
    <Text full={true} req={req}>
      <Label>{label}</Label>
      <textarea rows={rows} onChange={e => handler(id, e.target.value)} />
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
      {options.map(option => (
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

export function SubmitButton({ text = 'Lähetä', handler }) {
  return <Button type="submit" onClick={handler} value={text} />;
}
