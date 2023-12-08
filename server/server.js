

/////////////////////////////////////////////////////////////////////////////////////////////
// NO SE SI ESTE CODIGO FUNCIONA ES PARTE DE VUESTRA PARTE, PERO PROBAD A VER SI FUNCIONA //
/////////////////////////////////////////////////////////////////////////////////////////////

import express from 'express';
const app = express();
const port = 3000;
import { gorros } from "./data/gorrosService.js";
import { sudaderas } from "./data/sudaderaService.js";
import { camisetas } from "./data/camisetaService.js";


// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Ruta para obtener todos los elementos
app.get('/elementos', (req, res) => {
  const elementos = obtenerElementos();
  res.json(elementos);
});

// Ruta para obtener un elemento por ID
app.get('/elementos/:categoria/:id', (req, res) => {
  const elementos = obtenerElementos();
  const id = parseInt(req.params.id);
  const categoria = req.params.categoria;
  const elemento = elementos.find(el => el.id === id && el.categoria === categoria);

  if (elemento) {
    res.json(elemento);
  } else {
    res.status(404).json({ mensaje: 'Elementos no encontrado' });
  }
});

// Ruta para crear un nuevo elemento
app.post('/elementos', (req, res) => {
  const elementos = obtenerElementos();
  const nuevoElemento = req.body;

  // Asignar un nuevo ID al elemento
  nuevoElemento.id = obtenerNuevoId(elementos);

  elementos.push(nuevoElemento);
  guardarElementos(elementos);

  res.json({ mensaje: 'Elemento creado exitosamente', elemento: nuevoElemento });
});

// Ruta para actualizar un elemento por ID
app.put('/elementos/:id', (req, res) => {
  const elementos = obtenerElementos();
  const id = parseInt(req.params.id);
  const indice = elementos.findIndex(el => el.id === id);

  if (indice !== -1) {
    const elementoActualizado = req.body;
    elementoActualizado.id = id;
    elementos[indice] = elementoActualizado;

    guardarElementos(elementos);

    res.json({ mensaje: 'Elemento actualizado exitosamente', elemento: elementoActualizado });
  } else {
    res.status(404).json({ mensaje: 'Elemento no encontrado' });
  }
});

// Ruta para eliminar un elemento por ID
app.delete('/elementos/:id', (req, res) => {
  const elementos = obtenerElementos();
  const id = parseInt(req.params.id);
  const indice = elementos.findIndex(el => el.id === id);

  if (indice !== -1) {
    const elementoEliminado = elementos.splice(indice, 1)[0];
    guardarElementos(elementos);

    res.json({ mensaje: 'Elemento eliminado exitosamente', elemento: elementoEliminado });
  } else {
    res.status(404).json({ mensaje: 'Elemento no encontrado' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Función para obtener elementos desde el archivo JSON
function obtenerElementos() {
  const datos=[...camisetas,...gorros,...sudaderas];
  return datos;

}

// Función para guardar elementos en el archivo JSON
function guardarElementos(elementos) {
  const contenido = JSON.stringify(elementos, null, 2);
  // fs.writeFileSync('elementos.json', contenido, 'utf-8');
}

// Función para obtener un nuevo ID para un elemento
function obtenerNuevoId(elementos) {
  const maxId = elementos.reduce((max, el) => (el.id > max ? el.id : max), 0);
  return maxId + 1;
}