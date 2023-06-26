const modeloJunta = require("../models").Junta;
const modeloGrabacion = require("../models").Grabacion;
const modeloTask = require("../models").Task;
const modeloEvidence = require("../models").Evidence;
const modeloRol = require("../models").Rol;
const modeloParticipant = require("../models").Participant;
const modeloParticipant_Junta = require("../models").Participant_Junta;

const createEvidence = (req, res) => {
  modeloEvidence
    .create(req.body)
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};
const getEvidences = (req, res) => {
  modeloEvidence
    .findAll({
      include: [{ model: modeloJunta }],
    })
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};
const updateEvidence = (req, res) => {
  modeloEvidence
    .update(req.body, {
      where: { id: req.params.id },
    })
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};
const deleteEvidence = (req, res) => {
  modeloEvidence
    .destroy({
      where: { id: req.params.id },
    })
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};

const createTask = (req, res) => {
  modeloTask
    .create(req.body)
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};
const getTasks = (req, res) => {
  modeloTask
    .findAll({
      include: [{ model: modeloJunta }],
    })
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};
const updateTask = (req, res) => {
  modeloTask
    .update(req.body, {
      where: { id: req.params.id },
    })
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};
const deleteTask = (req, res) => {
  modeloTask
    .destroy({
      where: { id: req.params.id },
    })
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};
// Crear una junta
const createJunta = (req, res) => {
  modeloJunta
    .create(req.body)
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};
const getJuntasDB = (req, res) => {
  modeloJunta
    .findAll({
      include: [
        { model: modeloGrabacion }, 
        { model: modeloTask, 
          include: [{
            model: modeloEvidence
          }] 
        }
      ],
    })
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};
const updateJunta = (req, res) => {
  modeloJunta
    .update(req.body, {
      where: { id: req.params.id },
    })
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};
const deleteJunta = (req, res) => {
  modeloJunta
    .destroy({
      where: { id: req.params.id },
    })
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};

// Crear una grabacion
const createGrabacion = (req, res) => {
  modeloGrabacion
    .create(req.body)
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};

// Mostrar las grabaciones
const getGrabacionesDB = (req, res) => {
  modeloGrabacion
    .findAll({
      include: [{ model: modeloJunta }],
    })
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};

// Borrar una grabacion
const deleteGrabacion = (req, res) => {
  modeloGrabacion
    .destroy({
      where: { id: req.params.id },
    })
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};

// Editar una grabacion
const updateGrabacion = (req, res) => {
  modeloGrabacion
    .update(req.body, {
      where: { id: req.params.id },
    })
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};

module.exports = {
  createJunta,
  getJuntasDB,
  updateJunta,
  deleteJunta,
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
};
