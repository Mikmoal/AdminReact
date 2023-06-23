import React, { useEffect, useCallback, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { subDays, subHours } from "date-fns";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography, Modal } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { JuntasTable } from "../sections/gestion/gestion-table";
import { getJuntasFromBack } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const now = new Date();

const data = [
  {
    id: "5e887ac47eed253091be10cb",

    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),

    name: "Junta 1",
  },
  {
    id: "5e887b209c28ac3dd97f6db5",

    avatar: "/assets/avatars/avatar-fran-perez.png",
    createdAt: subDays(subHours(now, 1), 2).getTime(),

    name: "Junta 2",
  },
  {
    id: "5e887b7602bdbc4dbb234b27",

    avatar: "/assets/avatars/avatar-jie-yan-song.png",
    createdAt: subDays(subHours(now, 4), 2).getTime(),

    name: "Junta 3",
  },
  {
    id: "5e86809283e28b96d2d38537",

    avatar: "/assets/avatars/avatar-anika-visser.png",
    createdAt: subDays(subHours(now, 11), 2).getTime(),

    name: "Junta 4",
  },
  {
    id: "5e86805e2bafd54f66cc95c3",

    avatar: "/assets/avatars/avatar-miron-vitold.png",
    createdAt: subDays(subHours(now, 7), 3).getTime(),

    name: "Junta 5",
  },
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJuntasFromBack());
  }, [dispatch]);

  const juntas = useSelector((state) => state.juntas);

  //Estado para el modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Gestionar juntas</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Juntas actuales</Typography>
              </Stack>
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
                  Nueva junta
                </Button>
                <Modal
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="keep-mounted-modal-title"
                  aria-describedby="keep-mounted-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                      Text in a modal
                    </Typography>
                    <div>
                      <Head>
                        <meta charSet="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                        <title>Nueva Minuta</title>
                        <Link rel="stylesheet" href="../nuevajunta/code/normalize.css" />
                        <Link rel="preconnect" href="https://fonts.googleapis.com" />
                        {/* crossorigin */}
                        <Link rel="preconnect" href="https://fonts.gstatic.com"></Link>
                        <Link
                          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;700&display=swap"
                          rel="stylesheet"
                        />
                        <Script
                          src="https://kit.fontawesome.com/c420906ffa.js"
                          crossOrigin="anonymous"
                        ></Script>
                        <Link rel="stylesheet" href="../nuevajunta/code/nueva_minuta.css" />
                      </Head>
                      <header>
                        <div>
                          <div>
                            <img src="../nuevajunta/code/logo.png" alt="racingcargo-logo" />
                          </div>
                        </div>
                      </header>

                      <div id="minuta">
                        <div>
                          <div>
                            <div>
                              <label htmlFor="minuta"># Minuta</label>
                              <input type="text" id="numeroMinuta" />
                            </div>

                            <div>
                              <label htmlFor="fecha">Fecha</label>
                              <input type="datetime-local" id="fechaMinuta" />
                            </div>

                            <div>
                              <label htmlFor="encargadoMinuta">Encargado de Minuta</label>
                              <input type="text" id="encargadoMinuta" />
                            </div>

                            <div>
                              <label htmlFor="estatus">Estatus de Minuta</label>
                              <select name="estatus" id="estatus">
                                <option value="estatusOpcion">Pendiente</option>
                                <option value="estatusOpcion">En Progreso</option>
                                <option value="estatusOpcion">Completada</option>
                              </select>
                            </div>

                            <div>
                              <label htmlFor="descripcion">Descripcion</label>
                              <textarea
                                name="descripcion"
                                id="descripcion"
                                cols="30"
                                rows="10"
                              ></textarea>
                            </div>
                          </div>

                          <div>
                            <form action="" method="post" id="agregarTarea">
                              <div>
                                <div>
                                  <label for="tarea">Tarea</label>
                                  <textarea
                                    name="tarea"
                                    id="tarea"
                                    cols="30"
                                    rows="10"
                                    placeholder="Escribe una tarea..."
                                    maxlength="90"
                                  ></textarea>
                                </div>

                                <div>
                                  <label for="fechaCompromiso">Fecha Compromiso</label>
                                  <input type="date" id="fechaCompromiso" />
                                </div>

                                <div>
                                  <label for="asignado">Asignar</label>
                                  <select id="asignadoId">
                                    <option>Alan Chávez</option>
                                    <option>Antonio Gonzalez</option>
                                    <option>Enrique Cristerna</option>
                                    <option>Miguel Morales</option>
                                    <option>Javier Huitrón</option>
                                  </select>
                                </div>

                                <div>
                                  <label for="estatus">Status</label>
                                  <select id="statusId">
                                    <option>Pendiente</option>
                                    <option>En Progreso</option>
                                    <option>Completado</option>
                                  </select>
                                </div>

                                <div id="insertarAlerta"></div>

                                <button type="submit">Agregar</button>
                              </div>
                            </form>
                          </div>

                          <div>
                            <div>
                              <div></div>
                            </div>
                            <div>
                              <h2>Tareas Agregadas</h2>
                              <div id="tareasAsignadas"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Script src="../nuevajunta/code/nueva_minuta.js"></Script>
                    </div>
                  </Box>
                </Modal>
              </div>
            </Stack>
            {/* <CustomersSearch /> */}
            <JuntasTable
              count={juntas.length}
              items={juntas}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
