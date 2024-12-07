const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const createTemperaments = require("./src/Helpers/createTemperaments");

const port = process.env.PORT || 3001; //Esto es importantisimo, ya que Vercel usa la variable PORT

// Syncing all the models at once.
//conn.sync({ force: true }).then(() => {
  conn.sync().then(() => {
  server.listen(port, () => {
    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
    createTemperaments();
  });
});