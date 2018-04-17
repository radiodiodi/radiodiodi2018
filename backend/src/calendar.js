const fs = require('fs');
const readline = require('readline');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const utils = require('./utils');

const google = require('googleapis');
const GoogleAuth = require('google-auth-library');

const calendar = google.calendar('v3');
const listFn = promisify(calendar.events.list);

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_DIR = `${process.env.HOME || process.env.HOMEPATH ||
  process.env.USERPROFILE}/.credentials/`;
const TOKEN_PATH = `${TOKEN_DIR}radiodiodi-calendar-credentials.json`;
const CALENDAR_ID = 'radiodiodi.fi_9g8tojuhcb2dgj82l51sr09jno%40group.calendar.google.com';
const START_DATE = new Date(Date.parse('2018-04-12T00:00:00.000+03:00'));
const END_DATE = new Date(Date.parse('2018-05-01T00:00:00.000+03:00'));
const CALENDAR_INTERVAL = 1000 * 60 * 15; // 15 minutes

let calendarData = [];

function parseEventDescription(event) {
  const parts = event.description.split('---').map(p => p.replace(/\r?\n?/g, ''));
  return {
    ...event,
    ...{
      team: parts[0],
      description: parts[1],
      genre: parts[3],
      image: parts[4],
    },
  };
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log(`Token stored to ${TOKEN_PATH}`);
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token; // eslint-disable-line no-param-reassign
      storeToken(token);
      return callback(oauth2Client); // eslint-disable-line consistent-return
    });
  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */

function authorize(credentials, callback) {
  const clientSecret = credentials.web.client_secret;
  const clientId = credentials.web.client_id;
  const redirectUrl = credentials.web.redirect_uris[0];
  const auth = new GoogleAuth();
  const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  return readFile(TOKEN_PATH).then(token => {
    oauth2Client.credentials = JSON.parse(token);
    return callback(oauth2Client);
  }).catch(() => getNewToken(oauth2Client, callback));
}

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth) {
  const response = await listFn({
    auth,
    calendarId: CALENDAR_ID,
    timeMin: START_DATE.toISOString(),
    timeMax: END_DATE.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events = response.items;
  if (events.length === 0) {
    return [];
  }

  const newCalendar = events.map(event => {
    const title = event.summary;
    const description = event.description || '';
    const start = event.start.dateTime || event.start.date;
    const end = event.end.dateTime || event.end.date;
    const result = parseEventDescription({
      title,
      description,
      start,
      end,
    });
    return result;
  });

  return newCalendar;
}

const initCalendarReader = credentials => {
  const readCalendar = async () => {
    try {
      const results = await authorize(credentials, listEvents);

      calendarData = results;
      utils.info(`Updated calendar. Fetched ${results.length} results.`);
    } catch (err) {
      utils.error('Error while authorizing calendar.');
      console.log(err);
    }
  };

  readCalendar();

  setInterval(readCalendar, CALENDAR_INTERVAL);
};

readFile('client_secret.json')
  .then(r => JSON.parse(r))
  .then(initCalendarReader)
  .catch(console.log);

module.exports = () => calendarData;
