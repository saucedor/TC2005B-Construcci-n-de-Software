const express     = require('express');
const bodyParser  = require('body-parser');
const path        = require('path');
const indexRoutes = require('./routes/index');

const app = express();

// 1) Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// 2) Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// 3) Rutas
app.use(indexRoutes);

// 4) Levantar servidor
app.listen(3000, () => console.log('🚀 Server on http://localhost:3000'));
