import express from 'express';
import * as productService from './productService.js';
import { Nombres } from './productService.js';
const router = express.Router();



router.get('/', (_req, res) => {
    const type = _req.query.type;
    let products = {};

    if (!type || type === 'todos') {
        products.sudaderas = productService.getPosts('sudaderas');
        products.camisetas = productService.getPosts('camisetas');
        products.gorros = productService.getPosts('gorros');
    } else {
        products[type] = productService.getPosts(type);
    }

    res.render('index', products);
});

router.get('/new', (_req, res) => {
    res.render('new_post');
});

router.post('/post/new', (req, res) => {
    let { nombre, descripcion, precio, elementRadio, img } = req.body;
    productService.addPost(elementRadio, { elementRadio, nombre, descripcion, precio, img });
    res.render('saved_post', {message: 'Producto guardado con éxito'});
    }
);


router.post('/post/edit/:id,:elementRadio', (req, res) => {
    let {nombre, descripcion, precio, img } = req.body;
    let id = req.params.id;
    let elementRadio = req.params.elementRadio;
    if (!nombre || !descripcion || !precio || !elementRadio || !img) {
        res.render('saved_post', { message: 'Por favor ingrese todos los campos' });
    }else if(precio < 0 || precio > 300){res.render('saved_post', { message: 'El precio debe estar entre 0 y 300'});}
    else{
    productService.editPost({id, elementRadio, nombre, descripcion, precio, img });
    res.render('saved_post', {message: 'Producto editado con éxito'});
    }
});

router.get('/post/edition/:id,:elementRadio', (req, res) => {
    let post = productService.getPost(req.params.elementRadio, req.params.id);
    res.render('new_post', { post });
});



router.get('/post/:id,:elementRadio', (req, res) => {
    let post = productService.getPost(req.params.elementRadio, req.params.id);
    res.render('show_post', { post, reviews: reviews.get(req.params.id)});
});


// Asumiendo que productService.getPosts ahora acepta un segundo argumento que especifica cuántos posts saltar
router.get('/loadMore', (req, res) => {
    const type = req.query.type;
    const skip = Number(req.query.skip) || 0;
    const products = productService.getPosts(type, skip);
    res.json(products);
});

// borrado de elementos
router.get('/post/:id/delete', (req, res) => {
    const elementRadio = req.query.elementRadio;
    const postId = req.params.id;

    if (elementRadio) {
        productService.deletePost(elementRadio, postId);
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
    if (!req.body.name || !req.body.rating || !req.body.review) {
        res.render('saved_post', { message: 'Por favor ingrese todos los campos' });
        return;
    } else if (req.body.rating < 1 || req.body.rating > 10) {
        res.render('saved_post', { message: 'La calificación debe estar entre 1 y 10' });
        return;
    } else {
        let review = {
            name: req.body.name,
            rating: req.body.rating,
            review: req.body.review
        };
        reviews = productService.addReview(req.params.id, review, reviews);
    }
    res.redirect(`/post/${req.params.id},${req.params.elementRadio}`);
});


router.get('/availablenombre', (req, res) => {

    let nombre = req.query.nombre;

    let availablenombre = Nombres.indexOf(nombre) === -1;

    let response = {
        available: availablenombre
    }

    res.json(response);
})

// Exportar el enrutador para su uso en otras partes de la aplicación
export default router;
