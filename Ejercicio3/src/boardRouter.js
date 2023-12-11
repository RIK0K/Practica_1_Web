// Importar el módulo 'express'
import express from 'express';

// Importar funciones del servicio de tablero
import * as boardService from './boardService.js';

// Crear una instancia del enrutador de Express
const router = express.Router();

// Ruta para manejar la solicitud GET a '/'
router.get('/', (_req, res) => {
    // Obtener publicaciones de diferentes categorías del servicio de tablero
    const sudaderas = boardService.getPosts('sudaderas');
    const camisetas = boardService.getPosts('camisetas');
    const gorros = boardService.getPosts('gorros');

    // Renderizar la vista 'index' con las publicaciones obtenidas
    res.render('index', { sudaderas, camisetas, gorros });
});

// Ruta para manejar la solicitud POST a '/post/new'
router.post('/post/new', (req, res) => {
    // Obtener datos del cuerpo de la solicitud
    let { nombre, descripcion, precio, elementRadio, img } = req.body;
    // Agregar una nueva publicación al servicio de tablero
    boardService.addPost(elementRadio, { nombre, descripcion, precio, img });
    // Renderizar la vista 'saved_post'
    res.render('saved_post');
});

// Ruta para manejar la solicitud GET a '/post/:id'
router.get('/post/:id', (req, res) => {
    // Obtener la publicación según el ID proporcionado
    let post = boardService.getPost(req.params.id);
    // Renderizar la vista 'show_post' con la publicación obtenida
    res.render('show_post', { post });
});

// Ruta para manejar la solicitud GET a '/post/:id/delete'
router.get('/post/:id/delete', (req, res) => {
    // Eliminar la publicación según el ID proporcionado
    boardService.deletePost(req.params.id);
    // Renderizar la vista 'deleted_post'
    res.render('deleted_post');
});

// Ruta adicional que maneja la solicitud GET a '/'
router.get('/', (req, res) => {
    // Renderizar la vista 'Producto' con datos del cuerpo de la solicitud
    res.render('Producto', {
        name: req.body.name,
        rating: req.body.rating,
        review: req.body.review,
    });
});

// Arreglo para almacenar reseñas
let reviews = [];

// Ruta para manejar la solicitud POST a '/:review'
router.post('/:review', (req, res) => {
    // Agregar la nueva reseña al arreglo
    if (!req.body.name || !req.body.rating || !req.body.review) {
        // Renderizar la vista 'Producto' con un mensaje de error si faltan campos
        res.render('Producto', { errorMessage: 'Por favor ingrese todos los campos', reviews: reviews });
        return;
    } else {
        reviews.push({
            name: req.body.name,
            rating: req.body.rating,
            review: req.body.review
        });

        // Renderizar la vista 'Producto' con el arreglo de reseñas actualizado
        res.render('Producto', { reviews: reviews });
    }
});

// Exportar el enrutador para su uso en otras partes de la aplicación
export default router;
