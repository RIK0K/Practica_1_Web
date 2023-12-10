
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
app.get('/elementos/:categoria/:id', (req, res));

// Ruta para crear un nuevo elemento
app.post('/elementos/:categoria', (req, res) => {
  const response = crearElemento(req.body)
});


// Ruta para actualizar un nuevo elemento
app.put('/elementos/:categoria/:id', (req, res) => {
  const response = guardarElemento(req.body)
});


// Ruta para eliminar un elemento por ID y categoria
app.delete('/elementos/:categoria/:id', (req, res) => {
  const response = borrarElemento(req.params.categoria, parseInt(req.params.id))
});

//RESEÑAS

// Ruta para obtener todos los elementos
app.get('/elementos/resenas', (req, res) => {
  const resenas = obtenerResenasDeLosElementos();
  res.json(resenas);
});

// Ruta para obtener un elemento por ID y categoria
app.get('/elementos/resenas/:categoria/:id', (req, res));

// Ruta para crear un nuevo elemento
app.post('/elementos/resenas/:categoria/:id', (req, res) => {
  const response = crearResenaDelElemento(req.body)
});


await iniciarArchivosDeElementos()

// Iniciar el servidor
app.listen(port, async () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

function addelementoToDOM(elemento, i) {
  let div = document.createElement("div");
  content.appendChild(div);

  let pTitulo = document.createElement("p");
  div.appendChild(pTitulo);

  pTitulo.textContent = camiseta.imagen;
}

function addelemento(nuevoelemento) {

  elemento.push(nuevoelemento);

  addelementoToDOM(nuevoelemento, elemento.length - 1);

}

function nuevoElemento() {

  let nombreInput = document.getElementById('nombre');
  let nombre = nombreInput.value;
  nombreInput.value = '';

  let descripcionInput = document.getElementById('descripcion');
  let descripcion = descripcionInput.value;
  descripcionInput.value = '';

  let imagenInput = document.getElementById('imagen');
  let imagen = imagenInput.value;
  imagenInput.value = '';

  let precioInput = document.getElementById('precio');
  let precio = precioInput.value;
  precioInput.value = '';

  let libro = { nombre: nombre, descripcion: descripcion, imagen: imagen, precio: precio};

  addelemento(libro);
}

let content = document.getElementById('content');

for (let i = 0; i < elemento.length; i++) {

    let elemento = elemento[i];

    addelementoToDOM(libro, i);
}