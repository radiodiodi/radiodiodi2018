const monk = require('monk');
const utils = require('./utils');

const statsDatabaseURL = `${process.env.MONGODB_HOST}/${process.env.MONGODB_STATS_DB}`;
utils.info(`Mongo stats DB: ${statsDatabaseURL}`);
const statsDB = monk(statsDatabaseURL);
const listeners = statsDB.get('listeners');
const nowPlaying = statsDB.get('now_playing');

const shoutboxDatabaseURL = `${process.env.MONGODB_HOST}/${process.env.MONGODB_SHOUTBOX_DB}`;
utils.info(`Mongo shoutbox DB: ${shoutboxDatabaseURL}`);
const shoutboxDB = monk(shoutboxDatabaseURL);
const messages = shoutboxDB.get('messages');
const bans = shoutboxDB.get('bans');

const registrationsDatabaseURL = `${process.env.MONGODB_HOST}/${process.env.MONGODB_REGISTRATION_DB}`;
utils.info(`Mongo registration DB: ${registrationsDatabaseURL}`);
const registrationDB = monk(registrationsDatabaseURL);
const registrations = registrationDB.get('registrations');


module.exports = {
  listeners,
  nowPlaying,
  messages,
  bans,
  registrations,
};
