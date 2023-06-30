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
  Modal,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { subDays, subHours } from "date-fns";
import { OverviewTasks } from "src/sections/overview/overview-tasks";
import { OverviewParticipants } from "src/sections/overview/overview-participantes";
import { OverviewRecords } from "../../sections/overview/overview-grabaciones";
import { OverviewEvidence } from "../../sections/overview/overview-evidencias";
import { useDispatch, useSelector } from "react-redux";
import { OverviewJuntas } from "../../sections/overview/overview-juntas";
import { getById } from "../../redux/actions";
import { useRouter } from "next/router";
import React, { useEffect, useCallback, useMemo, useState } from "react";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import FormTask from "../../components/formTask";

const now = new Date();

const Page = (props) => {
  //Estado para el modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;

      console.log("This is de id: " + id);
      console.log(router.query);
      dispatch(getById(id));
    }
  }, [router.isReady, dispatch]);

  const junta = useSelector((state) => state.detail);
  console.log(Array.isArray(junta.datos));
  console.log(junta.datos);

  let evidences = [];
  let grabaciones = [];

  return (
    <>
      <Head>
        <title>Resumen de junta</title>
      </Head>
      {!router.isReady || !junta.datos ? (
        <div>
          <p>Loading</p>
        </div>
      ) : (
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
                <div>
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    onClick={handleOpen}
                  >
                    Nueva tarea
                  </Button>
                  <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                  >
                    <FormTask />
                  </Modal>
                </div>
              </Grid>
              <Grid xs={12} md={12} lg={8}>
                <OverviewJuntas />
              </Grid>
              <Grid xs={12} md={12} lg={8}>
                <OverviewTasks tareas={junta.datos.Tasks} sx={{ height: "100%" }} />
              </Grid>
              <Grid xs={12} md={6} lg={4}>
                {junta.datos.Tasks.forEach((el) => {
                  el.Evidence.forEach((el) => {
                    evidences.push({
                      id: el.id,
                      name: el.link,
                      updatedAt: el.updatedAt,
                    });
                  });
                })}
                <OverviewEvidence evidencias={evidences} sx={{ height: "100%" }} />
              </Grid>
              <Grid xs={12} md={6} lg={4}>
                <OverviewParticipants
                  participantes={junta.datos.integrantes}
                  sx={{ height: "100%" }}
                />
              </Grid>
              <Grid xs={12} md={6} lg={4}>
                {junta.datos.Grabacions.forEach((el) => {
                  grabaciones.push({
                    id: el.id,
                    name: el.link,
                    updatedAt: el.updatedAt,
                  });
                })}
                <OverviewRecords grabaciones={grabaciones} sx={{ height: "100%" }} />
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
