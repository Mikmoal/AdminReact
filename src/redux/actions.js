import axios from "axios";
export const GET_OTHER_CALENDARS = "GET_OTHER_CALENDARS";
export const SET_CALENDAR_EVENTS = "SET_CALENDAR_EVENTS";
export const REMOVE_CALENDAR_EVENTS = "REMOVE_CALENDAR_EVENTS";


export const getGoogleSession = async () => {
  await axios.get("http://localhost:3001/api").then(response => {
    console.log(response)
  })
}

export const getOtherCalendars = () => async (dispatch) => {
  await axios
    .get("http://localhost:3001/api/events")
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
