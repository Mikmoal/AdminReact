import axios from "axios";
export const GET_OTHER_CALENDARS = "GET_OTHER_CALENDARS";
export const SET_CALENDAR_EVENTS = "SET_CALENDAR_EVENTS";
export const REMOVE_CALENDAR_EVENTS = "REMOVE_CALENDAR_EVENTS";


// export const getGoogleOAuthURL = () => {
//   const rootURL = "https://accounts.google.com/o/oauth2/v2/auth";

//   const options = {
//     redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
//     client_id:process.env.GOOGLE_CLIENT_ID,
//     access_type: "offline",
//     response_type: "code",
//     prompt: "consent",
//     scope: [
//       "https://www.googleapis.com/auth/calendar.readonly",
//       "https://www.googleapis.com/auth/userinfo.email",
//       "https://www.googleapis.com/auth/userinfo.profile",
//       "https://www.googleapis.com/auth/calendar",
//       "https://www.googleapis.com/auth/calendar.calendarlist",
//       "https://www.googleapis.com/auth/calendar.events"
//     ].join[" "],
//   };

//   console.log({options});
//   const qt = new URLSearchParams(options);
//   console.log({qt});
//   return `${rootURL}?${qs.toString()}`;
// }
export const getGoogleSession = async () => {
  await axios.get("http://localhost:3001/").then(response => {
    console.log(response)
  })
}

export const getOtherCalendars = () => async (dispatch) => {
  await axios
    .get("http://localhost:3001")
    .then((response) => {
      dispatch({
        type: GET_OTHER_CALENDARS,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const seleccionarCalendarios = (calendarios) => ({
  type: SET_CALENDAR_EVENTS,
  payload: calendarios,
});
export const quitarCalendarios = (calendarios) => ({
  type: REMOVE_CALENDAR_EVENTS,
  payload: calendarios
})
