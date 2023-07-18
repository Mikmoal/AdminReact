import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Calendar from "rc-year-calendar";
import CalendarList from "../sections/calendar/CalendarList";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOtherCalendars } from "../redux/actions";
import DateCalendarViews from "../components/DateCalendarViews";
import ChipsViews from "../components/ChipsViews";
import DateCalendarWeek from "../components/DateCalendarWeek";
import TableJuntas from "../components/TableJuntas";

const Page = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOtherCalendars());
  }, [dispatch]);

  const calendarsRaw = useSelector((state) => state.calendarsRaw);
  const calendariosSeleccionados = useSelector((state) => state.calendariosSeleccionados);
  let calendariosSeleccionadosClean = [];
  if (calendariosSeleccionados.length) {
    console.log("Aqui calendariosSeleccionados:");
    console.log(calendariosSeleccionados);

    // Originalmente habria [{id,events},{id,events},...]
    // transformar el estado de calendariosSeleccionados a [ {},{}] array de puros eventos

    calendariosSeleccionados.map((el) => {
      calendariosSeleccionadosClean = [...el.events];
    });
  }

  return (
    <>
      {/* {!calendarsRaw.length ? (
        <div>
          <p>Cargando...</p>
        </div>
      ) : (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 2,
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid xs={12} md={8} lg={3}>
                <CalendarList calendars={calendarsRaw} />
              </Grid>

              <Grid xs={13} md={13} lg={9}>
                <Calendar dataSource={calendariosSeleccionadosClean} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      )} */}
      <Grid>
        <DateCalendarViews />
      </Grid>
      <Grid>
        <ChipsViews />
      </Grid>
      <Grid>
      <DateCalendarWeek/>
      </Grid>
      <Grid>
      <TableJuntas/>
      </Grid>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
