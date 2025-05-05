const express     = require('express');
const bodyParser  = require('body-parser');
const cookieParser= require('cookie-parser');
const session     = require('express-session');
const flash       = require('connect-flash');

const cookiesCtrl = require('./controllers/cookies');
const sesionesCtrl= require('./controllers/sesiones');
const flashCtrl   = require('./controllers/flash');

const app = express();

// — Motor de vistas
app.set('view engine', 'ejs');

// — Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'un string muy largo y aleatorio, no lo compartas',
  resave: false,            // no guarda sesión si no cambió
  saveUninitialized: false  // no crea sesión hasta que se usa
}));
app.use(flash());

// para poder usar en todas las vistas
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

app.use(express.static('public'));

// — Rutas
app.get('/',         (req,res) => res.render('index'));
app.get('/set-cookie', cookiesCtrl.setCookie);
app.get('/get-cookie', cookiesCtrl.getCookie);

app.get('/set-session', sesionesCtrl.setSession);
app.get('/get-session', sesionesCtrl.getSession);
app.get('/destroy-session', sesionesCtrl.destroySession);

app.get('/flash',     flashCtrl.flashDemo);
app.get('/show-flash',flashCtrl.showFlash);

// — Arranca el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
