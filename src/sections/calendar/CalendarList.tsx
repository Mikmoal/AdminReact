import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CalendarLists() {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Calendario 1" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Calendario 2" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Calendario 3" />
    </FormGroup>
  );
}