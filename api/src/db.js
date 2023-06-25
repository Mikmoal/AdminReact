require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/rc_juntas_directivos`
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Participante, Grabacion, Junta, Tarea, Evidencia } = sequelize.models;

// Aca vendrian las relaciones
Junta.hasMany(Grabacion, { foreignKey: 'id_junta' });
Grabacion.belongsTo(Junta);

Junta.hasMany(Tarea, { foreignKey: 'id_junta' });
Tarea.belongsTo(Junta);

Junta.belongsToMany(Participante, { through: "Participante_Junta" });
Participante.belongsToMany(Junta, { through: "Participante_Junta" });

Tarea.hasMany(Evidencia, { foreignKey: 'id_tarea' });
Evidencia.belongsTo(Tarea);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
