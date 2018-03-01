import React, { Fragment } from 'react';
import styled from 'styled-components';

const Text = styled.div`
  margin-bottom: 1rem;
  input,
  textarea {
    padding: 10px;
    border-radius: 5px;
    border: none;
  }
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

export function TextInput({ label, type = 'text' }) {
  return (
    <Text>
      <Label>{label}</Label>
      <input type={type} />
    </Text>
  );
}

export function TextArea({ label, rows = 5 }) {
  return (
    <Text>
      <Label>{label}</Label>
      <textarea rows={rows} />
    </Text>
  );
}

export function RadioButton({ label, options, name = 'radio' }) {
  return (
    <Text>
      <Label>{label}</Label>
      {options.map(option => (
        <div>
          <input type="radio" id={option} name={name} />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </Text>
  );
}

export function SubmitButton({ text = 'Lähetä', handler }) {
  return <Button type="submit" onClick={handler} value={text} />;
}
