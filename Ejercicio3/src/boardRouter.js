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
    boardService.addPost(elementRadio, { nombre, descripcion, precio, img });
    res.render('saved_post');
});

router.get('/post/:id', (req, res) => {

    let post = boardService.getPost(req.params.id);

    res.render('show_post', { post });
});

router.get('/post/:id/delete', (req, res) => {

    boardService.deletePost(req.params.id);

    res.render('deleted_post');
});



router.get('/', (req, res) => {
    res.render('Producto',{
        name: req.body.name,
        rating: req.body.rating,
        review: req.body.review,
    });
});

let reviews = [];


router.post('/:review', (req, res) => {
    // Add the new review to the array
    if (!req.body.name || !req.body.rating || !req.body.review) {
        res.render('Producto', { errorMessage: 'Por favor ingrese todos los campos', reviews: reviews });
        return;
    }
    else{
    reviews.push({
        name: req.body.name,
        rating: req.body.rating,
        review: req.body.review
    });

    // Render the 'Producto' page with the updated reviews array
    res.render('Producto', { reviews: reviews });
}
});

export default router;