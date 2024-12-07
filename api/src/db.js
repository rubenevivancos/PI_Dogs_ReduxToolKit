require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { CA_CERTIFICATE, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const pg = require('pg'); //ES OBLIGATORIO PARA VERCEL


// Configuración para Sequelize para utilizar el cliente de PostgreSQL de pg: VERCEL NECESITA USAR PG
pg.defaults.ssl = {
  require: true,
  rejectUnauthorized: false, //En true verifica que el certificado sea valido, en produccion debe ser true
  ca: CA_CERTIFICATE         //Aiven pide un certificado, puede estar en blanco si es que rejectUnauthorized: false
};


const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  dialect: 'postgres', // Especifica que estamos utilizando PostgreSQL
  dialectModule: pg, // Utiliza el cliente de PostgreSQL de pg: VERCEL NECESITA USAR PG
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  define: {
    freezeTableName: true //El valor true hace que el nombre del modelo sea igual al de la tabla
  }
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/Models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/Models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog, Temperament } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Dog.belongsToMany(Temperament, {through: "Dog_Temperament"});
Temperament.belongsToMany(Dog, {through: "Dog_Temperament"});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
