import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getOtherCalendars } from "../../redux/actions";

export default function CalendarList(props) {
  const { calendars } = props
  console.log(calendars);
  return (
    <FormGroup>
      {calendars.map((calendar) => {
        return (
          <FormControlLabel
            key={calendar.etag}
            control={<Checkbox />}
            label={calendar.summary}
          />
        );
      })}
    </FormGroup>
  );
}
