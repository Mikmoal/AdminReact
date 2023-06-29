import {
  GET_OTHER_CALENDARS,
  SET_CALENDAR_EVENTS,
  REMOVE_CALENDAR_EVENTS,
  GET_JUNTAS,
  DETAIL,
  ADD_JUNTA,
  ADD_TASK
} from "./actions";

const initialState = {
  calendarsRaw: [],
  calendarsFixed: [],
  calendariosSeleccionados: [],
  juntas: [],
  detail: {},
  newJunta: {},
  newTask: {}
};

const reducer = (state = initialState, action) => {
  const fixEvents = (payload) => {
    //Función recibe el payload del backend con toda la data de la api de Google Calendar
    //luego genera un array de objetos con el id del calendario y events cuya propiedad tiene los eventos ya filtrados
    // para mandarlos al rc-calendar-react
    //payload = [{…}, {…}, {…}, {…}, {…}]

    const eventsArr = payload.map((calendar) => {
      // const arr = [{
      //   id: calendar.etag,
      //   events: [{},{},{}]
      // },{},{},{}]
      let idIncremental = 0;
      let stringName = "";
      let stringLocation = "Puebla, Mexico";
      let stringStartDate = "";
      let stringEndDate = "";

      const eventsArrayFromOneCalendar = calendar.items.map((element) => {
        // [{eventoArreglado},{},{} ]
        stringName = element.summary;
        stringStartDate = element.start.date || element.start.dateTime.slice(0, 10);
        stringEndDate = element.end.date || element.end.dateTime.slice(0, 10);
        return {
          id: idIncremental++,
          name: stringName,
          location: stringLocation,
          startDate: new Date(stringEndDate),
          endDate: new Date(stringEndDate),
        };
      });

      return {
        id: calendar.etag,
        events: eventsArrayFromOneCalendar,
      };
    });

    return eventsArr; //  [ {id:id, events:[{},{},{}] }, {}, {}, {} ]
  };

  const seleccionarCalendarioConEventos = (id) => {
    const calendarioEncontrado = state.calendarsFixed.find((el) => el.id === id);
    return [calendarioEncontrado];
  };

  switch (action.type) {
    case GET_OTHER_CALENDARS:
      return {
        ...state,
        calendarsRaw: action.payload,
        calendarsFixed: fixEvents(action.payload),
      };

    case SET_CALENDAR_EVENTS:
      return {
        ...state,
        calendariosSeleccionados: seleccionarCalendarioConEventos(action.payload),
      };

    case REMOVE_CALENDAR_EVENTS:
      return {
        ...state,
        calendariosSeleccionados: state.calendariosSeleccionados.filter(
          (el) => el.id !== action.payload
        ),
      };

    case GET_JUNTAS:
      return {
        ...state,
        juntas: action.payload,
      };

    case DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case ADD_JUNTA:
      return {
        ...state,
        newJunta: action.payload 
      }

    case ADD_TASK:
      return {
        ...state,
        newTask: action.payload 
      }

    default:
      return { ...state };
  }
};

export default reducer;
