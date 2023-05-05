import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { SimpleAccordion } from "../sections/calendar/calendar-accordion.tsx";
//import { BasicDateCalendar } from "../sections/calendar/calendar-days.js";
import { DemoApp } from "../sections/calendar/calendar-full.tsx";
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
              <SimpleAccordion></SimpleAccordion>
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <DemoApp></DemoApp>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
