import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { randomCreatedDate, randomTraderName, randomUpdatedDate } from "@mui/x-data-grid-generator";
import Stack from "@mui/material/Stack";

export default function BasicRowEditingGrid() {
  const [nbRows, setNbRows] = React.useState(3);
  const removeRow = () => setNbRows((x) => Math.max(0, x - 1));
  const addRow = () => setNbRows((x) => Math.min(100, x + 1));
  return (
    <div style={{ height: 300, width: "100%" }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Button size="small" onClick={removeRow}>
          Remove a row
        </Button>
        <Button size="small" onClick={addRow}>
          Add a row
        </Button>
      </Stack>
      <DataGrid editMode="row" rows={rows} columns={columns} />
    </div>
  );
}

const columns = [
  { field: "name", headerName: "Name", width: 180, editable: true },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    editable: true,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "dateCreated",
    headerName: "Date Created",
    type: "date",
    width: 180,
    editable: true,
  },
  {
    field: "lastLogin",
    headerName: "Last Login",
    type: "dateTime",
    width: 220,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 2,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 3,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 4,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 5,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];
