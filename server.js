const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Almacenar elementos en memoria
let elementos = [
  { id: 1, nombre: 'Elemento 1', precio: 20.0 },
  { id: 2, nombre: 'Elemento 2', precio: 30.0 },
  // Añadir más elementos aquí
];

// Endpoint para obtener elementos
app.get('/api/elementos', (req, res) => {
  res.json(elementos);
});

// Servir archivos estáticos (archivos HTML, CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'aqui va la ruta a nuestro archivo estatico'))); // NO TERMINDADO

// Capturar todas las demás solicitudes y redirigirlas a Pagina_Principal.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'aqui va la ruta a nuestro archivo estatico', 'Pagina_Principal.html')); // NO TERMINDADO
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});