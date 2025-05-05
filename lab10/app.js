// app.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        switch (req.url) {
            case '/':
                serveFile('views/index.html', res);
                break;
            case '/about':
                serveFile('views/about.html', res);
                break;
            case '/form':
                serveFile('views/form.html', res);
                break;
            case '/contacto':
                serveFile('views/contacto.html', res);
                break;
            default:
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Página no encontrada</h1>');
        }
    } else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const data = parse(body);
            fs.appendFile('data.txt', JSON.stringify(data) + '\n', err => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error al guardar datos');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end('<h1>Datos recibidos correctamente</h1><a href="/">Volver al inicio</a>');
                }
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Página no encontrada</h1>');
    }
});

function serveFile(filePath, res) {
    fs.readFile(path.join(__dirname, filePath), (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end('Error interno del servidor');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
}

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
