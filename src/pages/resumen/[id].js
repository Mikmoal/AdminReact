"use client";

import { useSearchParams } from "next/navigation";
import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import {
  Box,
  Button,
  SvgIcon,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { subDays, subHours } from "date-fns";
import { OverviewTasks } from "src/sections/overview/overview-tasks";
import { OverviewParticipants } from "src/sections/overview/overview-participantes";
import { OverviewRecords } from "../../sections/overview/overview-grabaciones";
import { OverviewEvidence } from "../../sections/overview/overview-evidencias";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OverviewJuntas } from "../../sections/overview/overview-juntas";
import { getById } from "../../redux/actions";
import { useRouter } from "next/router";

const now = new Date();

function renderizarDetail(junta) {
  const evidences = []
  junta.Tasks.forEach(el => {

    el.Evidence.forEach(el => {
      
      evidences.push({
        id: el.id,
        name: el.link,
        updatedAt: el.updatedAt
      })

    })

  })

  // const grabacions = []
  // junta.Grabacions.forEach(el => {
  //   grabacions.push({
  //     id: el.id,
  //     name: el.link,
  //     updatedAt: el.updatedAt
  //   })
  // })

  const grabacions = junta.Grabacions.map(el => {
    return {
      id: el.id,
      name: el.link,
      updatedAt: el.updatedAt
    }
  })

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 1,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid xs={12} md={12} lg={8}>
            <Typography variant="h4">Resumen</Typography>
            <Button
              color="inherit"
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowUpOnSquareIcon />
                </SvgIcon>
              }
            >
              Reagendar
            </Button>
            <Button
              color="inherit"
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowUpOnSquareIcon />
                </SvgIcon>
              }
            >
              Unirse
            </Button>
          </Grid>
          <Grid xs={12} md={12} lg={8}>
            <OverviewJuntas />
          </Grid>
          <Grid xs={12} md={12} lg={8}>
            <OverviewTasks tareas={junta.Tasks} sx={{ height: "100%" }} />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewEvidence evidencias={evidences} sx={{ height: "100%" }} />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewParticipants participantes={junta.participantes} sx={{ height: "100%" }} />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewRecords grabaciones={junta.grabaciones} sx={{ height: "100%" }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

const Page = (props) => {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (router.isReady) {
      const {id} = router.query;

      console.log("This is de id: " + id);
      console.log(router.query);
      dispatch(getById(id));
    }
    
  }, [router.isReady, dispatch]);

  const junta = useSelector((state) => state.detail);
  console.log(Array.isArray(junta.datos));
  console.log(junta.datos);

  return (
    <>
      <Head>
        <title>Resumen de junta</title>
      </Head>
      {!router.isReady||!junta.datos ? (
        <div>
          <p>Loading</p>
        </div>
      ) : (
        renderizarDetail(junta.datos)
      )}
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
