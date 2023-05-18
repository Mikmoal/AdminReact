import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AccordionJuntas } from "../sections/calendar/AccordionJuntas.tsx";
import Calendar from "rc-year-calendar";
import CalendarList from "../sections/calendar/CalendarList";
const Page = () => {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} md={6} lg={4}>
              {/* <AccordionJuntas/> */}
              <CalendarList/>
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <Calendar/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
