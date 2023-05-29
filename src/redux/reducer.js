import {
  GET_VG,
  GET_SEARCH,
  DETAIL,
  LOADING,
  CLEAN,
  FILTER_G,
  FILTER_VG,
  GET_G,
  ORDER_BY,
  ADD,
  GET_CALENDAR_EVENTS,
  GET_OTHER_CALENDARS,
} from "./actions";
// import { A_Z, Z_A } from "../constants";

const initialState = {
  videogames: [],
  Details: {},
  videogamesClean: [],
  genresState: [],
  empty: [],
  newVG: {},
  error: "",
  loading: false,
  calendar_events: [],
  other_calendars: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OTHER_CALENDARS:
      let idIncremental = 0;
      let stringName = "";
      let stringLocation = "Puebla, Mexico";
      let stringStartDate = "";
      let stringEndDate = "";
      const eventsArrFromCalendarZero = action.payload[0].items.map((item) => {
        stringName = item.summary;
        stringStartDate = item.start.date;
        stringEndDate = item.end.date;

        return {
          id: idIncremental++,
          name: stringName,
          location: stringLocation,
          startDate: new Date(stringStartDate),
          endDate: new Date(stringEndDate),
        };
      });
      return {
        ...state,
        other_calendars: action.payload,
        calendar_events: eventsArrFromCalendarZero
      };
    case GET_CALENDAR_EVENTS:
      return {
        ...state,
        calendar_events: action.payload,
      };
    case GET_VG:
      return {
        ...state,
        videogames: action.payload,
        videogamesClean: action.payload,
        error: "",
      };
    case GET_SEARCH:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_G:
      return {
        ...state,
        genresState: action.payload,
      };
    case ORDER_BY:
      let orderAz = [...state.videogames];
      orderAz = orderAz.sort((a, b) => {
        switch (action.payload) {
          case A_Z:
            if (a.name < b.name) {
              return -1;
            } else return 1;
          case Z_A:
            if (a.name > b.name) {
              return -1;
            } else return 1;
          default:
            return 0;
        }
      });
      return {
        ...state,
        videogames: orderAz,
      };
    case FILTER_G:
      let allG = [...state.genresState];

      let aux2 =
        action.payload === "All Genres"
          ? allG
          : allG.filter((el) => el.genres.includes(action.payload));
      console.log(aux2);
      return {
        ...state,
        videogames: aux2,
      };
    case FILTER_VG:
      let allVG = [...state.videogamesClean];
      let aux;
      console.log(allVG);
      if (action.payload === "All Videogames") return { ...state, videogames: allVG };
      if (action.payload === "Videogames api") {
        aux = allVG.filter((e) => Number(e.id));
      }
      if (action.payload === "New Videogame") {
        aux = allVG.filter((e) => !Number(e.id));
      }

      console.log(aux);
      return {
        ...state,
        videogames: aux,
      };
    case DETAIL:
      console.log(action.payload);
      return {
        ...state,
        Details: action.payload,
      };
    case ADD:
      return {
        ...state,
        newVG: action.payload,
      };
    default:
      return { ...state };
  }
};

export default reducer;
