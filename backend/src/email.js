require('dotenv').config()

const ejs = require('ejs');
const fs = require('fs');
const htmlToText = require('html-to-text');

const htmlTemplate = fs.readFileSync('./resource/email.html', 'utf8');

var send = require('gmail-send')({
  user: process.env.EMAIL_ADDRESS,
  pass: process.env.EMAIL_PASSWORD,
  subject: 'Radiodiodi 2018 ohjelmantekijäilmoittautuminen'
});

const sendEmail = (formParams) => {
  const html = ejs.render(htmlTemplate, { data: formParams });
  const text = htmlToText.fromString(html);
  return send({ to: formParams.email, html, text });
}

module.exports = {
  sendEmail
}
