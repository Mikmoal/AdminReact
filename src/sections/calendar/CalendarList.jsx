import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getCalendarEvents } from "../../redux/actions";

export default function CalendarLists() {
  //Aqui se llama a la API para traer los calendarios
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCalendarEvents());
  }, [dispatch])

  const eventsArr = useSelector(state => state.calendar_events)


  // interface Calendar { typescript
  //   title: string;
  // }
  // const allCalendars: Calendar[] = [];


  return (
    <FormGroup>
      {eventsArr.map((event) => {
        return (
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={event.summary}
          />
        );
      })}

      {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Calendario 1" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Calendario 2" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Calendario 3" /> */}
    </FormGroup>
  );
}
