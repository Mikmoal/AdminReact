import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Calendar from "rc-year-calendar";
import CalendarList from "../sections/calendar/CalendarList";
import { GoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOtherCalendars } from "../redux/actions";

const Page = () => {
  const currentYear = new Date().getFullYear();
  let calendarsArr;
  let eventsArrFromCalendarZero;
  let idIncremental = 0;
  let stringName = "";
  let stringLocation = "Puebla, Mexico";
  let stringStartDate = "";
  let stringEndDate = "";
  let yaEstanTodosLosPinchesDatos = false;
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOtherCalendars());
  }, [dispatch]);

  calendarsArr = useSelector((state) => state.other_calendars);

  const filtrarEventos = async (arr) => {
    const eventsArrFromCalendarZero = await arr[0].items.map((item) => {
      stringName = item.summary;
      stringStartDate = item.start.date;
      stringEndDate = item.end.date;

      return {
        id: idIncremental++,
        name: stringName,
        location: stringLocation,
        startDate: new Date(stringStartDate),
        endDate: new Date(stringEndDate),
      };
    });

    idIncremental = 0;
    return eventsArrFromCalendarZero;
  };

  eventsArrFromCalendarZero = useSelector((state) => state.calendar_events);

  // async function esperarPromesas() {
  //   try {
  //     // calendarsArr = await obtenerCalendarios(); // Esperar a que se resuelva la promesa1
  //     // console.log("Resultado 1:", calendarsArr);

  //     eventsArrFromCalendarZero = await filtrarEventos(calendarsArr); // Esperar a que se resuelva la promesa2
  //     console.log("Resultado 2:", eventsArrFromCalendarZero);

  //     // ... puedes continuar esperando más promesas

  //     console.log("Todas las promesas se resolvieron");

  //     if (Array.isArray(eventsArrFromCalendarZero)) yaEstanTodosLosPinchesDatos = true;
  //     console.log("yaEstanTodosLosPinchesDatos: " + yaEstanTodosLosPinchesDatos);

  //     // Aquí puedes realizar más acciones después de que todas las promesas se hayan resuelto
  //   } catch (error) {
  //     console.log("Ocurrió un error al esperar las promesas:", error);
  //   }
  // }

  

  // const [dataSource, setDataSource] = useState([
  //   {
  //     id: 0,
  //     name: "Google I/O",
  //     location: "San Francisco, CA",
  //     startDate: new Date(currentYear, 4, 28),
  //     endDate: new Date(currentYear, 4, 29),
  //   },


  return (
    <>
      {!calendarsArr.length && !Array.isArray(eventsArrFromCalendarZero) ? (
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
              <Grid xs={12} md={6} lg={2}>
                <CalendarList calendars={calendarsArr} />
              </Grid>
              <Grid xs={12} md={12} lg={10}>
                <Calendar dataSource={eventsArrFromCalendarZero} />
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
