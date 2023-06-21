const {
  google,
} = require("c:/Users/migue/OneDrive/Documents/Miguel Angel Morales/RC/AdminReact/api/node_modules/googleapis/build/src/index");
require("dotenv").config();
// const http = require("http");
const https = require("https");
const url = require("url");

///////////// AUTENTICACIÓN
/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI.  To get these credentials for your application, visit https://console.cloud.google.com/apis/credentials.
 */
/**
 * Create a new OAuth2 client with the configured keys.
 */
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);
/**
 * This is one of the many ways you can configure googleapis to use authentication credentials.  In this method, we're setting a global reference for all APIs.  Any other API you use here, like google.drive('v3'), will now use this auth client. You can also override the auth client at the service and method call levels.
 */
google.options({ auth: oauth2Client });
/**
 * Open an http server to accept the oauth callback. In this simple example, the only request to our webserver is to /callback?code=<code>
 */
const scopes = [
  "https://www.googleapis.com/auth/docs",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/calendar",
];
// Generate a url that asks permissions for the Drive activity scope
const authorizationUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",
  /** Pass in the scopes array defined above.
   * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  scope: scopes,
  // Enable incremental authorization. Recommended as a best practice.
  include_granted_scopes: true,
});
/* Global variable that stores user credential in this code example.
 * ACTION ITEM for developers:
 *   Store user's refresh token in your data store if
 *   incorporating this code into your real app.
 *   For more information on handling refresh tokens,
 *   see https://github.com/googleapis/google-api-nodejs-client#handling-refresh-tokens
 */
let userCredential = null;

const redirectToGoogleAuthServer = (req, res) => {
  // Example on redirecting user to Google's OAuth 2.0 server.
  // opn(authorizeUrl, { wait: false }).then((cp) => cp.unref());
  res.redirect(301, authorizationUrl);
};

const handleOAuthCallback = async (req, res) => {
  const code = req.query.code;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Aquí puedes acceder a los tokens de acceso y de actualización
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;

    res.redirect("http://localhost:3000/gestion");
  } catch (error) {
    console.error("Error en la autorización:", error);
    res.status(500).send("Error en la autorización");
  }
};

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

const getEvents = async (req, res) => {
  try {
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const response = await calendar.calendarList.list({});
    const listaDeCalendarios = response.data.items;
    if (!listaDeCalendarios || listaDeCalendarios.length === 0) {
      console.log("No calendars found.");
      return;
    }
    // console.log("List of calendars: ");
    // listaDeCalendarios.map((cal, i) => {
    //   console.log(`${i}: ${cal.summary}`);
    // });

    const arrayConEventos = [];

    for (let index = 0; index < listaDeCalendarios.length; index++) {
      const res = await getEventsLittle(calendar, listaDeCalendarios[index].id);
      arrayConEventos.push(res);
    }

    res.status(200).json(arrayConEventos);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error");
  }
};

const revokeToken = (req, res) => {
  // Build the string for the POST request
  let postData = "token=" + userCredential.access_token;

  // Options for POST request to Google's OAuth 2.0 server to revoke a token
  let postOptions = {
    host: "oauth2.googleapis.com",
    port: "443",
    path: "/revoke",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  // Set up the request
  const postReq = https.request(postOptions, function (res) {
    res.setEncoding("utf8");
    res.on("data", (d) => {
      console.log("Response: " + d);
    });
  });

  postReq.on("error", (error) => {
    console.log(error);
  });

  // Post the request with data
  postReq.write(postData);
  postReq.end();

  res.end();
};

module.exports = {
  redirectToGoogleAuthServer,
  handleOAuthCallback,
  revokeToken,
  getEvents,
};
