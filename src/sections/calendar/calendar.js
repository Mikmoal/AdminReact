import {
  Avatar,
  Box,
  Card,
  CardContent,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Iframe from "react-iframe";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";

export default function BasicDateCalendar() {
  //   const { difference, positive = false, sx, value } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
  );
}
{/* <Iframe url="https://calendar.google.com/calendar/embed?src=miguel.morales%40racingcargo.com&ctz=America%2FMexico_City"
        width="800"
        height="600"
        id=""
        className=""
        display="block"
        position="relative"/> */}