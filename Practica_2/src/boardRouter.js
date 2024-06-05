import express from 'express';
import * as boardService from './boardService.js';
const router = express.Router();


router.get('/', (_req, res) => {
    const sudaderas = boardService.getPosts('sudaderas');
    const camisetas = boardService.getPosts('camisetas');
    const gorros = boardService.getPosts('gorros');

    res.render('index', { sudaderas, camisetas, gorros });
});

router.get('/new', (_req, res) => {
    res.render('new_post');
});

router.post('/post/new', (req, res) => {
    let { nombre, descripcion, precio, elementRadio, img } = req.body;
    if (!nombre || !descripcion || !precio || !elementRadio || !img) {
        res.render('saved_post', { message: 'Por favor ingrese todos los campos' });
    }else if(precio < 0 || precio > 300){res.render('saved_post', { message: 'El precio debe estar entre 0 y 300'});}
    else{
    boardService.addPost(elementRadio, { elementRadio, nombre, descripcion, precio, img });
    res.render('saved_post', {message: 'Producto guardado con éxito'});
    }
});


router.post('/post/edit/:id,:elementRadio', (req, res) => {
    let {nombre, descripcion, precio, img } = req.body;
    let id = req.params.id;
    let elementRadio = req.params.elementRadio;
    if (!nombre || !descripcion || !precio || !elementRadio || !img) {
        res.render('saved_post', { message: 'Por favor ingrese todos los campos' });
    }else if(precio < 0 || precio > 300){res.render('saved_post', { message: 'El precio debe estar entre 0 y 300'});}
    else{
    boardService.editPost({id, elementRadio, nombre, descripcion, precio, img });
    res.render('saved_post', {message: 'Producto editado con éxito'});
    }
});

router.get('/post/edition/:id,:elementRadio', (req, res) => {
    let post = boardService.getPost(req.params.elementRadio, req.params.id);
    res.render('new_post', { post });
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
        res.render('saved_post', { message: 'Por favor ingrese todos los campos' });
        return;
    } else if (req.body.rating < 1 || req.body.rating > 10) {
        res.render('saved_post', { message: 'La calificación debe estar entre 1 y 10' });
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
