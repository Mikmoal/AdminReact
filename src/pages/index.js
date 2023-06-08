import Head from "next/head";
import Script from "next/script";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";

const now = new Date();

const Page = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Index | Racing Cargo</title>
        <Script src="https://accounts.google.com/gsi/client" async defer></Script>
      </Head>
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
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  router
                    .replace({
                      pathname: "/calendar",
                      // query: router.asPath !== "/" ? { continueUrl: router.asPath } : undefined,
                    })
                    .catch(console.error);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

// Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
