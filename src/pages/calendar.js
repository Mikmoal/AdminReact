import { SimpleAccordion } from "../sections/calendar/calendar-juntas.tsx";
import { BasicDateCalendar } from "../sections/calendar/calendar-days.js";
const Calendar = () => {
  return (
    <>
      <SimpleAccordion></SimpleAccordion>
      <BasicDateCalendar></BasicDateCalendar>
    </>
  );
};

export default Calendar;
