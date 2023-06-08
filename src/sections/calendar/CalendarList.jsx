import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Typography } from "@mui/material";
import { quitarCalendarios, seleccionarCalendarios } from "../../redux/actions";

export default function CalendarList(props) {
  const { calendars } = props
  const dispatch = useDispatch();

  const [checkedState, setCheckedState] = useState({});

  const handleCheckboxChange = (id) => (event) => {
    setCheckedState({ ...checkedState, [id]: event.target.checked });
    //aqui indica que ese check es de un calendario

    if (event.target.checked) {
      dispatch(seleccionarCalendarios(id));
      console.log("se ejecutó seleccionarCalendarios")
    } else {
      dispatch(quitarCalendarios(id));
      console.log("se ejecutó quitarCalendarios")
    }



  };

  const renderizarDatos = () => {
    return calendars.map((calendar) => {
      return (
        <FormControlLabel
          key={calendar.etag}
          control={<Checkbox key={calendar.etag} checked={checkedState[calendar.etag] || false} onChange={handleCheckboxChange(calendar.etag)} />}
          label={<Typography>{calendar.summary}</Typography>} />);
    });
  };

  return (
    <FormGroup>
      {renderizarDatos()}
    </FormGroup>
  );
}
