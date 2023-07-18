import Asistentes from "../components/Asistentes";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import FormComplete from "../components/FormComplete";
import {
  Box,
  Container,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import SelectJuntas from "../components/SelectJuntas";
import LugarFechaHora from "../components/LugarFechaHora";
import Actividades from "../components/Actividades";

const Page = () => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      p={1}
    >
      <Container maxWidth="xl">
        <Grid container direction="column" justifyContent="center" alignItems="center">

          <Grid>
            <SelectJuntas />
            <TextField
              id="outlined-multiline-static"
              label="Objetivo"
              multiline
              rows={4}
              defaultValue="Objetivo de la junta"
            />
            <TextField id="outlined-required" label="Lugar" defaultValue="sala" />
            <LugarFechaHora />
          </Grid>

          <Grid >
            <Asistentes />
          </Grid>

          <Grid >
            <Actividades />
          </Grid>

        </Grid>
        
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
