import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function IndeterminateCheckbox() {
  const [checkedAll, setCheckedAll] = React.useState(false);
  const [checkedItems, setCheckedItems] = React.useState<boolean[]>([]);

  React.useEffect(() => {
    setCheckedAll(checkedItems.every((item) => item));
  }, [checkedItems]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = event.target.checked;
    setCheckedItems(updatedCheckedItems);
  };

  const handleCheckboxAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCheckedItems = Array(checkedItems.length).fill(event.target.checked);
    setCheckedAll(event.target.checked);
    setCheckedItems(updatedCheckedItems);
  };

  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={checkedItems[0] || false}
            onChange={(event) => handleCheckboxChange(event, 0)}
          />
        }
        label="Eduardo Haros"
      />

      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={checkedItems[1] || false}
            onChange={(event) => handleCheckboxChange(event, 1)}
          />
        }
        label="Jahzeel Cabrera"
      />

      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={checkedItems[2] || false}
            onChange={(event) => handleCheckboxChange(event, 2)}
          />
        }
        label="Jorge Juárez"
      />
    </Box>
  );

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox checked={checkedAll} onChange={handleCheckboxAllChange} color="primary" />
        }
        label="Seleccionar todos"
      />
      {children}
    </div>
  );
}
