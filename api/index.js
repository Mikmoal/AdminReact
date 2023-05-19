//index.js code for integrating Google Calendar
require("dotenv").config();
const { PRIVATE_KEY, CLIENT_EMAIL, PROJECT_NUMBER, CALENDAR_ID } = process.env;

const express = require("express");
const { google } = require("googleapis");

const app = express();

const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const GOOGLE_PRIVATE_KEY = PRIVATE_KEY;
const GOOGLE_CLIENT_EMAIL = CLIENT_EMAIL;
const GOOGLE_PROJECT_NUMBER = PROJECT_NUMBER;
const GOOGLE_CALENDAR_ID = CALENDAR_ID;

const jwtClient = new google.auth.JWT(GOOGLE_CLIENT_EMAIL, null, GOOGLE_PRIVATE_KEY, SCOPES);

const calendar = google.calendar({
  version: "v3",
  project: GOOGLE_PROJECT_NUMBER,
  auth: jwtClient,
});

app.get("/", (req, res) => {
  calendar.events.list(
    {
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (error, result) => {
      if (error) {
        res.send(JSON.stringify({ error: error }));
      } else {
        if (result.data.items.length) {
          res.send(JSON.stringify({ events: result.data.items }));
        } else {
          res.send(JSON.stringify({ message: "No upcoming events found." }));
        }
      }
    }
  );
});

app.listen(3000, () => console.log(`App listening on port 3000!`));

// This code is contributed by Yashi Shukla
