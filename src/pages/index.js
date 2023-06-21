import Head from "next/head";
import React, { useEffect } from "react";
import Script from "next/script";
import { subDays, subHours } from "date-fns";
import { Box, Container, Typography, Stack, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewJuntas } from "../sections/overview/overview-juntas";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import GoogleLoginButton from "../components/login-btn";

const now = new Date();

const Page = () => {
  const boton = (
    <>
      <div
        id="g_id_onload"
        data-client_id="363684052179-ddqp5vv08v9rnfp3hq3f88qn8go4pote.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri="http://localhost:3001/api"
        data-auto_select="true"
        data-itp_support="true"
      ></div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </>
  );

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Stack spacing={2}>
          <Typography>Racing Cargo</Typography>

          {boton}
        </Stack>
      </Box>
    </>
  );
};

// Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
