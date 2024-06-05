import express from 'express';
import * as boardService from './boardService.js';
const router = express.Router();


router.get('/', (_req, res) => {
    const sudaderas = boardService.getPosts('sudaderas');
    const camisetas = boardService.getPosts('camisetas');
    const gorros = boardService.getPosts('gorros');

    res.render('index', { sudaderas, camisetas, gorros });
});


router.post('/post/new', (req, res) => {
    let { nombre, descripcion, precio, elementRadio, img } = req.body;
    boardService.addPost(elementRadio, { elementRadio, nombre, descripcion, precio, img });
    res.render('saved_post');
});


router.get('/post/:id,:elementRadio', (req, res) => {
    let post = boardService.getPost(req.params.elementRadio, req.params.id);
    res.render('show_post', { post, reviews: reviews.get(req.params.id)});
});




// borrado de elementos
router.get('/post/:id/delete', (req, res) => {
    const elementRadio = req.query.elementRadio;
    const postId = req.params.id;

    if (elementRadio) {
        boardService.deletePost(elementRadio, postId);
        res.render('deleted_post');
    } else {
        console.error('La categoría no se proporcionó en la URL.');
        res.status(400).send('Bad Request');
    }
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
let reviews = new Map();


router.post('/post/:id,:elementRadio/review', (req, res) => {
    // Agregar la nueva reseña al arreglo
    if (!req.body.name || !req.body.rating || !req.body.review) {
        // Renderizar la vista 'Producto' con un mensaje de error si faltan campos
        res.render('show_post', { errorMessage: 'Por favor ingrese todos los campos', reviews: reviews.get(req.params.id) });
        return;
    } else {
        // Si ya existen reseñas para este producto, las obtenemos
        let productReviews = reviews.get(req.params.id) || [];
        // Agregamos la nueva reseña al arreglo de reseñas del producto
        productReviews.push({
            name: req.body.name,
            rating: req.body.rating,
            review: req.body.review
        });
        // Guardamos las reseñas actualizadas en el mapa
        reviews.set(req.params.id, productReviews);
    }
    let post = boardService.getPost(req.params.elementRadio, req.params.id);

    // redirigir la vista 'Producto' con el arreglo de reseñas actualizado
    res.redirect(`/post/${req.params.id},${req.params.elementRadio}`);
});

// Exportar el enrutador para su uso en otras partes de la aplicación
export default router;
