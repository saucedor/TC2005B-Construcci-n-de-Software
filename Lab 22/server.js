const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + file.originalname;
    cb(null, unique);
  }
});

const filter = (req, file, cb) => {
  const tipos = ['image/jpeg', 'image/jpg', 'image/png'];
  cb(null, tipos.includes(file.mimetype));
};

const upload = multer({ storage, fileFilter: filter });

// Middleware
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta para subir archivo
app.post('/uploads', upload.single('archivo'), (req, res) => {
    if (!req.file) return res.status(400).send('Archivo no válido');
    res.redirect('/index.html');
  });
  
// Ruta para devolver lista de imágenes
app.get('/imagenes', (req, res) => {
  fs.readdir('./uploads', (err, files) => {
    if (err) return res.status(500).json([]);
    const imagenes = files.filter(f => f.match(/\.(png|jpe?g)$/i));
    res.json(imagenes);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

