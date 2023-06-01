import axios from "axios";
export const GET_CALENDAR_EVENTS = "GET_CALENDAR_EVENTS";
export const GET_OTHER_CALENDARS = "GET_OTHER_CALENDARS";


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

export const getCalendarEvents = () => async (dispatch) => {
  await axios
    .get("http://localhost:3001/calendar")
    .then((response) => {
      dispatch({
        type: GET_CALENDAR_EVENTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};