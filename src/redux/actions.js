import axios from "axios";
export const GET_VG = "GET_VG";
export const GET_SEARCH = "GET_SEARCH";
export const DETAIL = "DETAIL";
export const GET_G = "GET_G";
export const FILTER_VG = "FILTER_VG";
export const FILTER_G = "FILTER_G";
export const ORDER_BY = "ORDER_BY";
export const ADD = "ADD";
export const FAIL = "FAIL";
export const LOADING = "LOADING";
export const CLEAN = "CLEAN";
export const GET_CALENDAR_EVENTS = "GET_CALENDAR_EVENTS";
export const GET_OTHER_CALENDARS = "GET_OTHER_CALENDARS";

export const getVG = () => async (dispatch) => {
  await axios
    .get("http://localhost:3001/videogames")
    .then((response) => {
      dispatch({
        type: GET_VG,
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



export const getName = (name) => async (dispatch) => {
  try {
    await axios
      .get("http://localhost:3001/videogames?name=" + name)
      .then((response) => {
        dispatch({
          type: GET_SEARCH,
          payload: response.data,
        });
      });
  } catch (error) {
    return alert("VIDEO JUEGOOO no encontrado");
  }
};

export const getId = (id) => async (dispatch) => {
  try {
    await axios.get(`http://localhost:3001/videogames/${id}`).then((response) => {
      dispatch({
        type: DETAIL,
        payload: response.data,
      });
    });
  } catch (error) {
    return error;
  }
};

export const create = (payload) => async (dispatch) => {
  try {
    await axios
      .post("http://localhost:3001/videogames", payload)
      .then((response) => {
        dispatch({
          type: ADD,
          payload: response.data,
        });
      });
  } catch (error) {
    return error;
  }
};

export const getGenres = () => async (dispatch) => {
  try {
    await axios.get("http://localhost:3001/genres").then((response) => {
      dispatch({
        type: GET_G,
        payload: response.data,
      });
    });
  } catch (error) {
    return error;
  }
};

export function filterVG(payload) {
  return {
    type: FILTER_VG,
    payload,
  };
}

export function filterG(payload) {
  return {
    type: FILTER_G,
    payload,
  };
}

export function orderBy(payload) {
  return {
    type: ORDER_BY,
    payload,
  };
}

export function clean() {
  return {
    type: CLEAN,
  };
}
