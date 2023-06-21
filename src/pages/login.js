import React, { useEffect } from "react";
import Script from "next/script";
import { Box, Container, Typography, Stack, Unstable_Grid2 as Grid } from "@mui/material";

const login = () => {
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
          <Item>
            <Typography>Racing Cargo</Typography>
          </Item>
          <Item>{boton}</Item>
        </Stack>
      </Box>
    </>
  );
};

export default login;
