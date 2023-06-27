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
import { OverviewRecords } from "../sections/overview/overview-grabaciones";
import { OverviewEvidence } from "../sections/overview/overview-evidencias";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OverviewJuntas } from "../sections/overview/overview-juntas";
import { getById } from "../redux/actions";

const now = new Date();

function renderizarDetail(junta) {
  return(
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
            <OverviewTasks
              tareas={junta.tareas}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewEvidence
              evidencias={junta.evidencias}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewParticipants
              participantes={junta.participantes}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewRecords
              grabaciones={junta.grabaciones}
              sx={{ height: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const Page = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getById(props.match.params.id))
  }, [dispatch, props.match.params.id])
  const junta = useSelector((state) => state.detail)
   console.log(Array.isArray(junta))
   console.log(junta)
  return (
    <>
      <Head>
        <title>Resumen de junta</title>
      </Head>
      {!junta.id ? (
        <div>
          <img src={loading} width="120px" alt="loading" />{" "}
        </div>
      ) : (
        renderizarDetail(junta)
      )}
    </>
  );
}
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
