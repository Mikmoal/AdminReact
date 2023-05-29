//aqui empieza a filtrar los evenetps de los calendarios

eventsArrFromCalendarZero = calendarsArr[0].items.map((item) => {
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
  })