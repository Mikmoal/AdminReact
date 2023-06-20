const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const apiRouter = require("./apiRouter.js");

const router = Router();

router.use("/api", apiRouter);




module.exports = router;
