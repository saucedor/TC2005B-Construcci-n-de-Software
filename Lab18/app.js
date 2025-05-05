const express = require('express');
const session = require('express-session');
const csrf = require('csurf');

const app = express();

// parse del body
app.use(express.urlencoded({ extended: false }));

// sesiones
app.use(session({
  secret: 'TU_SECRETO_ULTRA_SEGURA',
  resave: false,
  saveUninitialized: false,
  // store: tu store (opcional: Redis, SequelizeStore…)
}));

// CSRF protection
const csrfProtection = csrf();
app.use(csrfProtection);

// pasar el token CSRF a todas las vistas
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.set('view engine', 'ejs');

app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});
