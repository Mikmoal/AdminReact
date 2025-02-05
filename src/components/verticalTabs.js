import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getJuntasFromDataBase } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  let dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getJuntasFromDataBase());
  }, [dispatch]);

  const juntas = useSelector((state) => state.db_juntas);
  console.log(juntas);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      {!juntas.datos ? (
        <div>
          <p>Loading</p>
        </div>
      ) : (
        <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", height: 224 }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            {juntas.datos.map((junta, index) => {
              return <Tab label={junta.nombre} {...a11yProps(index)} />;
            })}
          </Tabs>

          {juntas.datos.map((junta, index) => {
            return (
              <TabPanel value={value} index={index}>
                {junta.nombre}
              </TabPanel>
            );
          })}
        </Box>
      )}
    </React.Fragment>
  );
}
