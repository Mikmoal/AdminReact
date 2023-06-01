import { GET_CALENDAR_EVENTS, GET_OTHER_CALENDARS } from "./actions";

const initialState = {
  calendar_events: [],
  other_calendars: [],
};

const reducer = (state = initialState, action) => {
  const fixEvents = (payload) => {
    //payload = [{…}, {…}, {…}, {…}, {…}]
    const eventsArr = payload.map((calendar) => { // [ [{},{},{}], [], [], [] ]

      let idIncremental = 0;
      let stringName = "";
      let stringLocation = "Puebla, Mexico";
      let stringStartDate = "";
      let stringEndDate = "";

      const eventsFromOneCalendar = calendar.items.map((element) => { // [{eventoArreglado},{},{} ]
        stringName = element.summary;
        stringStartDate = element.start.date || element.start.dateTime.slice(0,10);
        stringEndDate = element.end.date || element.end.dateTime.slice(0,10);
        return {
          id: idIncremental++,
          name: stringName,
          location: stringLocation,
          startDate: new Date(stringStartDate),
          endDate: new Date(stringStartDate),
        };
      });
      
      return eventsFromOneCalendar;

    });

    console.log(`Se ha ejecutado fixEvents: ${eventsArr[0][0]}`)
    return eventsArr;

  };


  switch (action.type) {
    case GET_OTHER_CALENDARS:
      return {
        ...state,
        other_calendars: action.payload,
        calendar_events: fixEvents(action.payload),
      };

    case GET_CALENDAR_EVENTS:
      return {
        ...state,
        calendar_events: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
