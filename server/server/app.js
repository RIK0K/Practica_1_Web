import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;


import {
  obtenerElemento, obtenerElementos, guardarElemento, crearElemento, borrarElemento, obtenerResenasDeLosElementos, crearResenaDelElemento, obtenerResenaDelElemento, iniciarArchivosDeElementos
} from "./metodos/metodos.js";


// Definir el array elementos
let elementos = [];

// Función para cargar un archivo JSON
async function cargarDatos(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar el archivo JSON:', error);
    return null;
  }
}

// Cargar los datos de los archivos JSON y combinarlos en el array elementos
Promise.all([
  cargarDatos('data/sudaderasService.json'),
  cargarDatos('data/camisetasService.json'),
  cargarDatos('data/gorrosService.json')
])
  .then((resultados) => {
    // Combina los arrays en un solo array elementos
    elementos = elementos.concat(resultados.map((resultado) => Object.values(resultado)[0]));

    // Imprime el array elementos
    console.log('Array elementos:', elementos);
  })
  .catch((error) => {
    console.error('Error al cargar los archivos JSON:', error);
  });

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