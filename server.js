const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Módulo simple para simular una base de datos en memoria
const db = {
  elementos: [
    { id: 1, nombre: 'Elemento 1', precio: 10 },
    { id: 2, nombre: 'Elemento 2', precio: 20 },
    // Agrega más elementos según sea necesario
  ],
};

// Endpoint para obtener elementos
app.get('/api/elementos', (req, res) => {
  res.json(db.elementos);
});

// Servir archivos estáticos (archivos HTML, CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'ruta-a-tu-carpeta-de-archivos-estaticos'))); // NO ESTA TERMINADO

// Capturar todas las demás solicitudes y redirigirlas a Pagina_Principal.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'ruta-a-tu-carpeta-de-archivos-estaticos', 'Pagina_Principal.html')); // NO ESTA TERMINADO
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
