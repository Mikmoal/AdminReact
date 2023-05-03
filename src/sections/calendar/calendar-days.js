import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

export function BasicDateCalendar() {
  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    //   <DateCalendar />
    // </LocalizationProvider>
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      weekends={false}
      events={[
        { title: "event 1", date: "2019-04-01" },
        { title: "event 2", date: "2019-04-02" },
      ]}
    />
  );
}
