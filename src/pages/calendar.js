import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
//import { AccordionJuntas } from "../sections/calendar/AccordionJuntas.tsx";
import Calendar from "rc-year-calendar";
import CalendarList from "../sections/calendar/CalendarList";
// import CalendarEventsR from "../sections/calendar/CalendarEvents.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import Script from "next/script";
import React, { useEffect } from 'react';
import {functionA } from "../sections/calendar/API.js";
const Page = () => {
  /**
      * Sample JavaScript code for calendar.calendarList.list
      * See instructions for running APIs Explorer code samples locally:
      * https://developers.google.com/explorer-help/code-samples#javascript
      */
  
  return (
    <>
    
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
