import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function AccordionJuntas() {
  return (
    <React.Fragment>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Junta de Hong Kong</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Participantes: ...,</Typography>
          <Typography>Encargado de minutas: ....,</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Junta 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Participantes: ...</Typography>
          <Typography>Encargado de minutas: ....,</Typography>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}
