require('dotenv').config()

const ejs = require('ejs');
const fs = require('fs');
const htmlToText = require('html-to-text');
const util = require('util');
const htmlTemplate = fs.readFileSync('./resource/email.html', 'utf8');

var send = require('gmail-send')({
  user: process.env.EMAIL_ADDRESS,
  pass: process.env.EMAIL_PASSWORD,
  subject: 'Radiodiodi 2018 ohjelmantekijäilmoittautuminen'
});

const sendPromise = util.promisify(send);

const sendEmail = async formParams => {
  const html = ejs.render(htmlTemplate, { data: formParams });
  const text = htmlToText.fromString(html);
  try {
    return await sendPromise({
      to: formParams.email,
      bcc: process.env.BCC_ADDRESS,
      html,
      text
    });
  } catch (err) {
    console.log(err);
    console.log('Email data:');
    console.log(formParams);
    throw err;
  }
}

module.exports = {
  sendEmail
}
