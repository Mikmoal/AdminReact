import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Modal
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import FormEvidence from "../../components/formEvidence";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import React, { useEffect,useState } from "react";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

export const OverviewTasks = (props) => {

  //Estado para el modal Evidencia
  const [openEvidence, setOpenEvidence] = useState(false);
  const handleOpenEvidence = () => setOpenEvidence(true);
  const handleCloseEvidence = () => setOpenEvidence(false);

  const { tareas = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Minutas" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 700 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre minuta</TableCell>
                <TableCell>Encargado de minuta</TableCell>
                <TableCell sortDirection="desc">Fecha de entrega</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tareas.map((tarea) => {
                //const createdAt = format(tarea.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow hover key={tarea.id}>
                    <TableCell>{tarea.nombre}</TableCell>
                    <TableCell>{tarea.encargado}</TableCell>
                    <TableCell>{tarea.fecha_entrega.substring(0, 10)}</TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[tarea.status]}>{tarea.status}</SeverityPill>
                    </TableCell>
                    <TableCell>
                      <Button
                        startIcon={
                          <SvgIcon fontSize="small">
                            <PlusIcon />
                          </SvgIcon>
                        }
                        variant="contained"
                        onClick={handleOpenEvidence}
                      >
                        Añadir link de evidencia
                      </Button>
                      <Modal
                        keepMounted
                        open={openEvidence}
                        onClose={handleCloseEvidence}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                      >
                        <FormEvidence id_task={tarea.id} />
                      </Modal>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions> */}
    </Card>
  );
};

OverviewTasks.prototype = {
  tareas: PropTypes.array,
  sx: PropTypes.object,
};
