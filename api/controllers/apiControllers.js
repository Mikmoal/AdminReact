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
      // Crear evento de google calendar
      // Refer to the Node.js quickstart on how to setup the environment:
      // https://developers.google.com/calendar/quickstart/node
      // Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
      // stored credentials.

      // const event = {
      //   summary: "Google I/O 2015", 
      //   location: "800 Howard St., San Francisco, CA 94103", 
      //   description: "A chance to hear more about Google's developer products.",
      //   start: {
      //     dateTime: "2015-05-28T09:00:00-07:00",
      //     timeZone: "America/Los_Angeles",
      //   },
      //   end: {
      //     dateTime: "2015-05-28T17:00:00-07:00",
      //     timeZone: "America/Los_Angeles",
      //   },
      //   recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
      //   attendees: [{ email: "lpage@example.com" }, { email: "sbrin@example.com" }],
      //   reminders: {
      //     useDefault: false,
      //     overrides: [
      //       { method: "email", minutes: 24 * 60 },
      //       { method: "popup", minutes: 10 },
      //     ],
      //   },
      // };

      // calendar.events.insert(
      //   {
      //     auth: auth,
      //     calendarId: "primary",
      //     resource: event,
      //   },
      //   function (err, event) {
      //     if (err) {
      //       console.log("There was an error contacting the Calendar service: " + err);
      //       return;
      //     }
      //     console.log("Event created: %s", event.htmlLink);
      //   }
      // );

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
        {
          model: modeloTask,
          include: [
            {
              model: modeloEvidence,
            },
          ],
        },
      ],
    })
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};
const getJuntaDBById = (req, res) => {
  const { id } = req.params;
  modeloJunta
    .findByPk(id, {
      include: [
        { model: modeloGrabacion },
        {
          model: modeloTask,
          include: [
            {
              model: modeloEvidence,
            },
          ],
        },
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
      res.json({ datos: data, id: req.params.id });
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
  getJuntaDBById,
};
