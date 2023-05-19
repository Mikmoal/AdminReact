import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

export async function authorize(): Promise<OAuth2Client> {
  const credentials = require('../credentials/google-calendar-credentials.json');
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  try {
    const token = require('../credentials/google-calendar-token.json');
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  } catch (error) {
    return getAccessToken(oAuth2Client);
  }
}

async function getAccessToken(oAuth2Client: OAuth2Client): Promise<OAuth2Client> {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Authorize this app by visiting this url:', authUrl);

  // Aquí debes implementar la lógica para obtener el código de autorización desde el usuario

  // Después de obtener el código de autorización, utiliza el siguiente código para obtener el token de acceso
  const token = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(token);

  // Guarda el token en un archivo para futuros usos
  fs.writeFileSync('../credentials/google-calendar-token.json', JSON.stringify(token));
  
  return oAuth2Client;
}
