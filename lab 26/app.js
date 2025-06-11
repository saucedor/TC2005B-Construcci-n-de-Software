// Descripción: Este es el archivo principal de la API de Batalla Naval.
// Aquí se configuran las rutas y se inicia el servidor.

const express = require('express');
const bodyParser = require('body-parser');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/', gameRoutes);

app.listen(3000, () => {
  console.log('Batalla Naval API corriendo en http://localhost:3000');
});
