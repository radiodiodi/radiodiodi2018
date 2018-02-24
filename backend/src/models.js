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

module.exports = {
  listeners,
  messages,
};