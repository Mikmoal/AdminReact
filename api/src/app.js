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
const { calendar } = require("googleapis/build/src/apis/calendar/index.js");
const { auth } = require("google-auth-library");

server.name = "API";
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://localhost:3000"); // update to match the domain you will make the request from
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

  // await listaDeCalendarios.forEach((cal) => {
  //   cal.events = getEvents(auth, cal.id);
  //   console.log("Aqui se agregaron los eventos del calendario " + cal.summary);
  // });

  return listaDeCalendarios;
}

async function getEventsLittle(calendar, id) {
  const res = await calendar.events.list({
    calendarId: id,
    timeMin: new Date().toISOString(),
    maxResults: 20,
    singleEvents: true,
    orderBy: "startTime",
  });
  return res.data;
}

async function getEvents(auth, arrCalendars) {
  const calendar = google.calendar({ version: "v3", auth });
  const arrayConEventos = []

  for (let index = 0; index < arrCalendars.length; index++) {
    const res = await getEventsLittle(calendar, arrCalendars[index].id);
    arrayConEventos.push(res);
  }
  //console.log(arrayConEventos);
  // map array to promises
  // const promises = await arrCalendars.map((el) => {
  //   const res = getEventsLittle(calendar, el.id);
  //   const events = res.data;
  //   if (!events || events.length === 0) {
  //     console.log("No upcoming events found.");
  //     return;
  //   }
  //   console.log("Upcoming 10 events:");
  //   events.map((event, i) => {
  //     const start = event.start.dateTime || event.start.date;
  //     console.log(`${start} - ${event.summary}`);
  //   });

  //   return events;
  // });
  // // wait until all promises are resolved
  // await Promise.all(promises);
  // console.log("Done!");

   return arrayConEventos;
}

//// RUTAS
server.get("/", async (req, res) => {
  try {
    // const result = await authorize().then(listEvents).then(getEvents);

    const auth = await authorize();
    const calendars = await listEvents(auth);
    const events = await getEvents(auth, calendars);

    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// METODO PARA TRAER EVENTOS

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
