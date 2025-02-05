import * as React from 'react';
import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function DateCalendarViews() {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
              defaultValue={dayjs('2023-04-17')}
              views={['year', 'month', 'day']}
            />
      </LocalizationProvider>
    );
  }