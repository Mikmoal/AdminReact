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
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Modal,
  Tooltip
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import { useDispatch, useSelector } from "react-redux";
import { getJuntasFromDataBase, deleteJunta } from "../../redux/actions";
import React, { useEffect, useCallback, useMemo, useState, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isFunction } from "formik";
import FormJunta from "../../components/formJunta";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

export const OverviewJuntas = (props) => {
  const router = useRouter();
  //Estado para el modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let dispatch = useDispatch();

  const [meetings, setMeetings] = useState(props.juntas);

  useEffect(() => {
    dispatch(getJuntasFromDataBase());
    console.log('useEffect');
    
  },[dispatch, meetings]);


  const handleDeleteJuntas = (id) => {
    deleteJunta(id)
    let newJuntas = meetings.filter((el) => el.id !== id);
    setMeetings(newJuntas);
  };

  return (
    <Card>
      <CardHeader title="Seleccionar una junta" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!meetings ? (
                <div>
                  <p>Loading</p>
                </div>
              // ) : Array.isArray(newJuntas) ? (
              //   newJuntas.map((junta) => {
              //     return (
              //       <TableRow hover key={junta.id}>
              //         <TableCell>
              //           <Link href={`/resumen/${junta.id}`}>{junta.nombre}</Link>
              //         </TableCell>
              //         <TableCell>
              //           <IconButton onClick={() => handleDeleteJuntas(junta.id)}>
              //             <DeleteIcon fontSize="small" />
              //           </IconButton>
              //         </TableCell>
              //       </TableRow>
              //     );
              //   })
              // ) : (

                ) : ( meetings.map((junta) => {
                  return (
                    <TableRow hover key={junta.id}>
                      <TableCell>
                        <Link href={`/resumen/${junta.id}`}>{junta.nombre}</Link>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDeleteJuntas(junta.id)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewJuntas.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
