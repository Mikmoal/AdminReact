import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Calendar from "rc-year-calendar";
import CalendarList from "../sections/calendar/CalendarList";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOtherCalendars } from "../redux/actions";

const Page = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOtherCalendars());
  }, [dispatch]);

  const calendarsArr = useSelector((state) => state.other_calendars);
  const allEventsArrFrom = useSelector((state) => state.calendar_events);
  if (allEventsArrFrom.length) {
    console.log("Aqui el array de eventos:")
    console.log(allEventsArrFrom[2])
  }
 
  return (
    <>
      {!calendarsArr.length && !allEventsArrFrom.length ? (
        <div>
          <p>Cargando...</p>
        </div>
      ) : (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid xs={12} md={8} lg={3}>
                <CalendarList calendars={calendarsArr} events={allEventsArrFrom} />
              </Grid>

              <Grid xs={13} md={13} lg={9}>
                <Calendar dataSource={allEventsArrFrom[1]}/>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
