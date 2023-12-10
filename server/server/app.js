
import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

import {
  obtenerElemento, obtenerElementos, guardarElemento, crearElemento, borrarElemento, obtenerResenasDeLosElementos, crearResenaDelElemento, obtenerResenaDelElemento, iniciarArchivosDeElementos
} from "./metodos/metodos.js";


app.init
// Middleware para parsear JSON en las solicitudes
app.use(cors());

// Ruta para obtener todos los elementos
app.get('/elementos', (req, res) => {
  const elementos = obtenerElementos();
  res.json(elementos);
});

// Ruta para obtener un elemento por ID y categoria
app.get('/elementos/:categoria/:id', (req, res) => {
  if (req.params.categoria === undefined) {
    res.status(404).json({ mensaje: 'La categoria es obligatoria' });
  }
  if (req.params.id === undefined) {
    res.status(404).json({ mensaje: 'El id es obligatoria' });
  }
  const elemento = obtenerElemento(req.params.categoria, parseInt(req.params.id));
  if (elemento !== undefined) {
    res.json(elemento);
  } else {
    res.status(404).json({ mensaje: 'Elementos no encontrado' });
  }
});

// Ruta para crear un nuevo elemento
app.post('/elementos/:categoria', (req, res) => {
  const response = crearElemento(req.body)
  res.json({ mensaje: `Nuevo elemento creado con el id: ${response} en la categoria ${req.body.categoria}` });
});


// Ruta para actualizar un nuevo elemento
app.put('/elementos/:categoria/:id', (req, res) => {
  const response = guardarElemento(req.body)
  res.json({ mensaje: `Elemento actulizado con el id: ${response} en la categoria ${req.body.categoria}` });
});


// Ruta para eliminar un elemento por ID y categoria
app.delete('/elementos/:categoria/:id', (req, res) => {
  if (req.params.categoria === undefined) {
    res.status(404).json({ mensaje: 'La categoria es obligatoria' });
  }
  if (req.params.id === undefined) {
    res.status(404).json({ mensaje: 'El id es obligatoria' });
  }
  const response = borrarElemento(req.params.categoria, parseInt(req.params.id))
  if (response) {
    res.json({ mensaje: `Elemento borrado con el id: ${req.params.id} en la categoria ${req.params.categoria}` });
  } else {
    res.json({ mensaje: `Elemento con el id: ${req.params.id} en la categoria ${req.params.categoria} no se ha podido borrar` });

  }
});

//RESEÑAS

// Ruta para obtener todos los elementos
app.get('/elementos/resenas', (req, res) => {
  const resenas = obtenerResenasDeLosElementos();
  res.json(resenas);
});

// Ruta para obtener un elemento por ID y categoria
app.get('/elementos/resenas/:categoria/:id', (req, res) => {
  if (req.params.categoria === undefined) {
    res.status(404).json({ mensaje: 'La categoria es obligatoria' });
  }
  if (req.params.id === undefined) {
    res.status(404).json({ mensaje: 'El id es obligatoria' });
  }
  const elemento = obtenerResenaDelElemento(req.params.categoria, parseInt(req.params.id));
  if (elemento !== undefined) {
    res.json(elemento);
  } else {
    res.status(404).json({ mensaje: 'Reseñas no encontrado' });
  }
});

// Ruta para crear un nuevo elemento
app.post('/elementos/resenas/:categoria/:id', (req, res) => {
  const response = crearResenaDelElemento(req.body)
  res.json({ mensaje: `La nueva reseña se creado para el elemento con el id: ${req.body.id} en la categoria ${req.body.categoria}` });
});


await iniciarArchivosDeElementos()

// Iniciar el servidor
app.listen(port, async () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});



