const express     = require('express');
const path        = require('path');
const bodyParser  = require('body-parser');

const indexRoutes = require('./routes/index');
const apiRoutes   = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// 1) Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2) Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// 3) Rutas
app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// 4) 404 para rutas no existentes
app.use((req, res) => {
  res.status(404)
     .render('404', { title: 'Página no encontrada', url: req.originalUrl });
});

app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
