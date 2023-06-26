const { Router } = require("express");
const router = Router();
const {
  redirectToGoogleAuthServer,
  handleOAuthCallback,
  revokeToken,
  getEvents,
  getJuntas,
} = require("../handlers/apiHandlers");
const {
  createGrabacion,
  getGrabacionesDB,
  deleteGrabacion,
  updateGrabacion,
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  createEvidence,
  getEvidences,
  updateEvidence,
  deleteEvidence,
  createJunta,
  getJuntasDB,
  updateJunta,
  deleteJunta
} = require("../controllers/apiControllers");

router.all("/", redirectToGoogleAuthServer);
router.all("/oauth2callback", handleOAuthCallback);
router.get("/events", getEvents);
router.get("/revoke", revokeToken);
router.get("/juntas", getJuntas);

// CRUD de Junta
router.post("/createJunta", createJunta);
router.get("/getJuntasDB", getJuntasDB);
router.put("/updateJunta", updateJunta);
router.delete("/deleteJunta", deleteJunta);

// CRUD de Grabacion
router.post("/createGrabacion", createGrabacion);
router.get("/getGrabacionesDB", getGrabacionesDB);
router.put("/updateGrabacion/:id", updateGrabacion);
router.delete("/deleteGrabacion/:id", deleteGrabacion);

// CRUD de Task
router.post("/createTask", createTask);
router.get("/getTasks", getTasks);
router.put("/updateTask/:id", updateTask);
router.delete("/deleteTask/:id", deleteTask);

// CRUD de Evidence
router.post("/createEvidence", createEvidence);
router.get("/getEvidences", getEvidences);
router.put("/updateEvidence/:id", updateEvidence);
router.delete("/deleteEvidence/:id", deleteEvidence);


module.exports = router;
