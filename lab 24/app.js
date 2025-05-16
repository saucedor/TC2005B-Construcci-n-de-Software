const express = require('express');
const bodyParser = require('body-parser');
const mensajeRoutes = require('./routes/mensajeRoutes');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api', mensajeRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
