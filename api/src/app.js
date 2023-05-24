const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();
require("./db.js");
// const axios = require("axios");
const server = express();
// const { JWT } = require("google-auth-library");
// const keys = require("../oauth_keys.json");
const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

server.name = "API";
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

///////// AUTENTICACIÓN

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

//// RUTAS
server.get("/", async (req, res) => {
  // try {
  //   const result = main();
  //   res.status(200).json(result);
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }

  /**
   * Lists the next 10 events on the user's primary calendar.
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
  async function listEvents(auth) {
    const calendar = google.calendar({ version: "v3", auth });
    const res = await calendar.calendarList.list({});
    const listaDeCalendarios = res.data.items;
    if (!listaDeCalendarios || listaDeCalendarios.length === 0) {
      console.log("No calendars found.");
      return;
    }
    console.log("List of calendars: ");
    listaDeCalendarios.map((cal, i) => {
      console.log(`${i}: ${cal.summary}`);
    });
  }

  authorize().then(listEvents).catch(console.error);
});

// server.get("/calendar", async (req, res) => {
//   const auth = new google.auth.GoogleAuth({
//     // Scopes can be specified either as an array or as a single, space-delimited string.
//     keyFile: GOOGLE_APPLICATION_CREDENTIALS,
//     scopes: ["https://www.googleapis.com/auth/calendar"],
//   });

//   // SETTING AUTH AS A GLOBAL OPTION
//   const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

//   // set auth as a global default
//   google.options({
//     auth: oauth2Client,
//   });

//   // Acquire an auth client, and bind it to all future calls
//   const authClient = await auth.getClient();
//   const project = await auth.getProjectId();

//   await calendar.calendarList.list(
//     { project, auth: authClient, showHidden: true },
//     (err, response) => {
//       if (err) {
//         console.error("Error al obtener los calendarios:", err);
//         res.send(JSON.stringify({ error: err }));
//         return;
//       }

//       const calendars = response;
//       if (calendars.length) {
//         console.log("Lista de calendarios:");
//         calendars.forEach((calendar) => {
//           console.log(`${calendar.summary} (${calendar.id})`);
//         });
//         res.send(JSON.stringify(response));
//       } else {
//         console.log("No se encontraron calendarios.");
//         res.send(JSON.stringify(response));
//       }
//     }
//   );

  // try {
  //   const data = await axios.get(`https://www.googleapis.com/calendar/v3/users/me/calendarList`);
  //   res.status(200).json(data);
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }

  // METODO PARA TRAER EVENTOS
  // calendar.events.list(
  //   {
  //     calendarId: GOOGLE_CALENDAR_ID,
  //     timeMin: new Date().toISOString(),
  //     maxResults: 10,
  //     singleEvents: true,
  //     orderBy: "startTime",
  //   },
  //   (error, result) => {
  //     if (error) {
  //       res.send(JSON.stringify({ error: error }));
  //     } else {
  //       if (result.data.items.length) {
  //         res.send(JSON.stringify(result.data.items));
  //       } else {
  //         res.send(JSON.stringify({ message: "No upcoming events found." }));
  //       }
  //     }
  //   }
  // );
//});

// server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
