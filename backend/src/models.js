const monk = require('monk');
const utils = require('./utils');

const mongo_stats = `${process.env.MONGODB_HOST}/${process.env.MONGODB_STATS_DB}`;
utils.info(`Mongo stats DB: ${mongo_stats}`);
const statsDB = monk(mongo_stats);
const listeners = statsDB.get('listeners');

const mongo_shoutbox = `${process.env.MONGODB_HOST}/${process.env.MONGODB_SHOUTBOX_DB}`;
utils.info(`Mongo shoutbox DB: ${mongo_shoutbox}`);
const shoutboxDB = monk(mongo_shoutbox);
const messages = shoutboxDB.get('messages');
const bans = shoutboxDB.get('bans');

const mongo_registrations = `${process.env.MONGODB_HOST}/${process.env.MONGODB_REGISTRATION_DB}`;
utils.info(`Mongo registration DB: ${mongo_registrations}`);
const registrationDB = monk(mongo_registrations);
const registrations = registrationDB.get('registrations');

module.exports = {
  listeners,
  messages,
  bans,
  registrations,
};