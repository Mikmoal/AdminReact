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
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import { useDispatch, useSelector } from "react-redux";
import { getJuntasFromBack } from "../../redux/actions";
import React, { useEffect, useCallback, useMemo, useState } from "react";
import Link from "next/link";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

export const OverviewJuntas = (props) => {
  // const { orders = [], sx } = props;
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJuntasFromBack());
  }, [dispatch]);

  const juntas = useSelector((state) => state.juntas);

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
              {juntas.map((junta) => {
                return (
                  <TableRow hover key={junta.id}>
                    <TableCell>
                      <Link href={`/resumen/${props.id}`}>{junta.nombre}</Link>
                    </TableCell>
                  </TableRow>
                );
              })}
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
