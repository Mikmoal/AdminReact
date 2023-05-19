import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
//import { AccordionJuntas } from "../sections/calendar/AccordionJuntas.tsx";
import Calendar from "rc-year-calendar";
import CalendarList from "../sections/calendar/CalendarList";
// import CalendarEventsR from "../sections/calendar/CalendarEvents.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
const Page = () => {
  return (
    <>
      <GoogleOAuthProvider clientId="363684052179-ddqp5vv08v9rnfp3hq3f88qn8go4pote.apps.googleusercontent.com">
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
                {/* <AccordionJuntas/> */}
                <CalendarList />
              </Grid>
              <Grid xs={12} md={12} lg={10}>
                <Calendar />
              </Grid>

              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </Grid>
          </Container>
        </Box>
      </GoogleOAuthProvider>
      ;
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
