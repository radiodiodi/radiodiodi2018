const WebSocket = require('ws');
const models = require('./models');
const utils = require('./utils');
const rateLimiter = require('ws-rate-limit');

let wss;

const start = () => {
  utils.info(`Listening for Websockets on ${process.env.HOST} on port ${process.env.WS_PORT}.`);

  wss = new WebSocket.Server({
    host: process.env.HOST,
    port: process.env.WS_PORT,
  });
  const rateLimit = rateLimiter('5s', 3);
  wss.on('connection', async (ws, req) => {
    rateLimit(ws);

    ws.on('message', async data => {
      const { name, text } = JSON.parse(data);
      utils.info(`Websocket: Received: "${text}" from "${name}"`);

      const forwardedIP = req.headers['x-forwarded-for'];
      const ip = forwardedIP && forwardedIP !== '127.0.0.1' ? forwardedIP : req.connection.remoteAddress;

      const message = {
        timestamp: new Date(Date.now()),
        name,
        text,
        ip,
      };

      const banned = await models.bans.findOne({ ip: message.ip });
      console.log(banned);
      if (banned) {
        ws.send(JSON.stringify({
          message: {
            name: 'SERVER',
            text: 'You are banned.',
            timestamp: new Date(Date.now()),
            error: true,
          },
        }));
        return;
      }

      const dbMessage = await models.messages.insert(message);

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            message: {
              name: message.name,
              text: message.text,
              timestamp: message.timestamp,
              _id: dbMessage._id,
            },
          }));
        }
      });
    });

    const initial = await models.messages.find({}, {
      limit: 100, sort: { timestamp: 1 },
    });

    ws.send(JSON.stringify({
      initial: initial.map(message => ({
        name: message.name,
        text: message.text,
        timestamp: message.timestamp,
        _id: message._id,
      })),
    }));

    ws.on('error', error => utils.error(`Websocket error. ${error}`));
    ws.on('limited', () => {
      utils.warning(`User from ip "${req.connection.remoteAddress}" has been throttled.`);
      ws.send(JSON.stringify({
        message: {
          name: 'SERVER',
          text: 'Calm down, you are sending too many messages.',
          timestamp: new Date(Date.now()),
          error: true,
        },
      }));
    });
  });
};

const eraseMessage = id => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        erase: id,
      }));
    }
  });
};

module.exports = {
  start,
  eraseMessage,
};
