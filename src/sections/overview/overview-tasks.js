import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
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
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const OverviewTasks = (props) => {
  const { tareas = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Tareas" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  ID task
                </TableCell>
                <TableCell>
                  Encargado de minuta
                </TableCell>
                <TableCell sortDirection="desc">
                  Fecha
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tareas.map((tarea) => {
                //const createdAt = format(tarea.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={tarea.id}
                  >
                    <TableCell>
                      {tarea.id}
                    </TableCell>
                    <TableCell>
                      encargado pendiente
                    </TableCell>
                    <TableCell>
                      {tarea.createdAt}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[tarea.status]}>
                        {tarea.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
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
      </CardActions>
    </Card>
  );
};

OverviewTasks.prototype = {
  tareas: PropTypes.array,
  sx: PropTypes.object
};
