import axios from "axios";
export const GET_OTHER_CALENDARS = "GET_OTHER_CALENDARS";
export const SET_CALENDAR_EVENTS = "SET_CALENDAR_EVENTS";
export const REMOVE_CALENDAR_EVENTS = "REMOVE_CALENDAR_EVENTS";
export const GET_JUNTAS = "GET_JUNTAS";
export const DETAIL = "DETAIL";
export const ADD_JUNTA = "ADD_JUNTA";
export const ADD_TASK = "ADD_TASK";
export const GET_JUNTAS_DB = "GET_JUNTAS_DB";
export const DELETE_JUNTA = "DELETE_JUNTA";
export const ADD_EVIDENCE = "ADD_EVIDENCE";
export const ADD_RECORD = "ADD_RECORD";
 
export const deleteJunta = async (id) => {
  await axios.delete(`http://localhost:3001/api/deleteJunta/${id}`).then(response => {
    dispatch({
      type: DELETE_JUNTA,
      payload: response.data
    })
  })
  .catch(error => {
    return error
  })
}
export const addEvidence = async () => {
  
}
export const addRecord = async () => {
  
}

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

export const getJuntasFromBack = () => async (dispatch) => {
  await axios.get("http://localhost:3001/api/juntas").then((response) => {
    dispatch({
      type: GET_JUNTAS,
      payload: response.data,
    })
  })
  .catch((error) => {
    return error;
  })

  // await axios.get("http://localhost:3001/api/getJuntasDB")
}

export const getJuntasFromDataBase = () => async (dispatch) => {
  await axios.get("http://localhost:3001/api/getJuntasDB").then((response) => {
    dispatch({
      type: GET_JUNTAS_DB,
      payload: response.data,
    })
  })
  .catch((error) => {
    return error;
  })

  // await axios.get("http://localhost:3001/api/getJuntasDB")
}

export const seleccionarCalendarios = (calendarios) => ({
  type: SET_CALENDAR_EVENTS,
  payload: calendarios,
});

export const quitarCalendarios = (calendarios) => ({
  type: REMOVE_CALENDAR_EVENTS,
  payload: calendarios
});

export const getById = (id) => async (dispatch) => {
  try {
    await axios.get(`http://localhost:3001/api/getJuntasDB/${id}`).then((response) => {
      dispatch({
        type: DETAIL,
        payload: response.data,
      });
    });
  } catch (error) {
    return error;
  }
};

export const createJunta = (payload) => async (dispatch) => {
  try {
    await axios
      .post("http://localhost:3001/api/createJunta", payload)
      .then((response) => {
        dispatch({
          type: ADD_JUNTA,
          payload: response.data,
        });
      });
  } catch (error) {
    return error;
  }
};

export const createTask = (payload) => async (dispatch) => {
  try {
    await axios
      .post("http://localhost:3001/api/createTask", payload)
      .then((response) => {
        dispatch({
          type: ADD_TASK,
          payload: response.data,
        });
      });
  } catch (error) {
    return error;
  }
};
export const createEvidence = (payload) => async (dispatch) => {
  try {
    await axios
      .post("http://localhost:3001/api/createEvidence", payload)
      .then((response) => {
        dispatch({
          type: ADD_EVIDENCE,
          payload: response.data,
        });
      });
  } catch (error) {
    return error;
  }
};
export const createRecord = (payload) => async (dispatch) => {
  try {
    await axios
      .post("http://localhost:3001/api/createGrabacion", payload)
      .then((response) => {
        dispatch({
          type: ADD_RECORD,
          payload: response.data,
        });
      });
  } catch (error) {
    return error;
  }
};