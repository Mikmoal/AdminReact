import { SimpleAccordion } from "../sections/calendar/calendar-juntas.tsx";
import { BasicDateCalendar } from "../sections/calendar/calendar-days.js";
import { DemoApp } from "../sections/calendar/calendar-full.tsx";
const Calendar = () => {
  return (
    <>
      <SimpleAccordion></SimpleAccordion>
      <DemoApp></DemoApp>
    </>
  );
};

export default Calendar;
