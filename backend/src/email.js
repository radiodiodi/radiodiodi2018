require('dotenv').config()

var ejs = require('ejs');
var fs = require('fs');

const htmlContent = fs.readFileSync('./resource/email.html', 'utf8');

var send = require('gmail-send')({
  user: process.env.EMAIL_ADDRESS,
  pass: process.env.EMAIL_PASSWORD,
  subject: 'Radiodiodi 2018 ohjelmantekijäilmoittautuminen',
  text: 'TODO: Create plaintext version of mail',
});

const sendEmail = (formParams) => {
  const htmlRenderized = ejs.render(htmlContent, {});
  return send({ to: formParams.email, html: htmlRenderized });
}

module.exports = {
  sendEmail
}