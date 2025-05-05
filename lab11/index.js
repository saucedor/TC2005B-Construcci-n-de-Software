// index.js
const express    = require('express');
const bodyParser = require('body-parser');
const fs         = require('fs');

// 1) Carga tus módulos de rutas al inicio
const usersRouter    = require('./routes/users');
const productsRouter = require('./routes/products');

const app = express();

// 2) Middleware de body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 3) Rutas principales
app.get('/', (req, res) => {
  res.send('¡Hola mundo desde Express!');
});

// 4) Monta tus routers
app.use('/users',    usersRouter);
app.use('/products', productsRouter);

// 5) Otras rutas de ejemplo
app.get('/about', (req, res) => {
  res.send('Acerca de esta aplicación');
});

app.get('/contact', (req, res) => {
  res.send(`
    <form action="/feedback" method="POST">
      <input name="msg" placeholder="Tu mensaje">
      <button>Enviar</button>
    </form>
  `);
});

app.post('/feedback', (req, res) => {
  const line = `Feedback: ${req.body.msg}\n`;
  fs.appendFileSync('feedback.txt', line);
  res.send('¡Gracias por tu feedback!');
});

// 6) Middleware 404 (siempre al final)
app.use((req, res) => {
  res.status(404).send('Error 404: Página no encontrada');
});

// 7) Finalmente arrancas el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
