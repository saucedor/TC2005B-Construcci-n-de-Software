// escribirArchivo.js
const fs = require('fs');

function escribirTexto(nombreArchivo, contenido) {
    fs.writeFile(nombreArchivo, contenido, (err) => {
        if (err) {
            console.error('Error al escribir el archivo:', err);
        } else {
            console.log(`Contenido escrito en el archivo "${nombreArchivo}" correctamente.`);
        }
    });
}

// Prueba
escribirTexto('saludo.txt', '¡Hola, este es el contenido del archivo!');
