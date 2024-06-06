const posts = {
    camisetas: new Map(),
    sudaderas: new Map(),
    gorros: new Map(),
};
let nextId = 0;

export const Nombres = [];

// Se incrementa en 1 el id para el siguiente elemento, se guarda en el mapa.
export const addPost = (elementRadio, post) => {
    if (!posts[elementRadio] || !(posts[elementRadio] instanceof Map)) {
        posts[elementRadio] = new Map();
    
    }
    Nombres.push(post.nombre);
    let id = nextId++;
    post.id = id.toString();
    posts[elementRadio].set(post.id, post);
}

export const editPost = (post) => {
    let elementRadio = post.elementRadio;
    Nombres.push(post.nombre);
    let id = post.id;
    posts[elementRadio].set(id, post);
}



export const deletePost = (elementRadio, id) => {
    if (posts[elementRadio] && posts[elementRadio] instanceof Map) {
        posts[elementRadio].delete(id);
    } else {
        console.error(`La categoría '${elementRadio}' no existe o no es un Map.`);
    }
}



// Se obtiene todos los elementos del mapa.
export function getPosts(elementRadio) {
    return [...posts[elementRadio].values()];
}


// Se obtiene un elemento concreto del mapa
export const getPost = (elementRadio, id) => {
    if (posts[elementRadio]) {
        return posts[elementRadio].get(id);
    } else {
        console.error(`La categoría '${elementRadio}' no existe.`);
        return null;
    }
}

export const addReview = (id, review, reviews) => {
    let productReviews = reviews.get(id) || [];
    productReviews.push(review);
    reviews.set(id, productReviews);
    return reviews;
}

// Ejemplos de uso: se añaden varios posts a las categorías 'sudaderas', 'camisetas' y 'gorros'.
addPost("sudaderas", { elementRadio: 'sudaderas', nombre: "Sudadera1", precio: 20, descripcion: "una sudadera muy bonita y caliente para el invierno. Se recomienda comprar una talla más de la que se suele usaar.", img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/293a76d0f5e97b6853ee64e6af02875d.jpg?imageView2/2/w/800/q/70" });
addPost("sudaderas", { elementRadio: 'sudaderas', nombre: "Sudadera2", precio: 25, descripcion: "una sudadera muy bonita y caliente para el invierno. Se recomienda comprar una talla más de la que se suele usaar.", img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/79cfe040ec56194cb973b68c20e12418.jpg?imageView2/2/w/800/q/70" });
addPost("sudaderas", { elementRadio: 'sudaderas', nombre: "Sudadera3", precio: 15, descripcion: "una sudadera muy bonita y caliente para el invierno. Se recomienda comprar una talla más de la que se suele usaar.", img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/d259fefb123d2776e72797e67eec8606.jpg?imageView2/2/w/800/q/70" });
addPost("sudaderas", { elementRadio: 'sudaderas', nombre: "Sudadera4", precio: 20, descripcion: "una sudadera muy bonita y caliente para el invierno. Se recomienda comprar una talla más de la que se suele usaar.", img: "https://img.kwcdn.com/product/open/2023-11-28/1701176876994-7519af7b53d7417f9214159b794def69-goods.jpeg?imageView2/2/w/800/q/70" });

addPost("camisetas", { elementRadio: 'camisetas', nombre: "Camiseta1", precio: 10, descripcion: "una sudadera muy bonita y caliente para el invierno. Se recomienda comprar una talla más de la que se suele usaar.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcL1d8maC63fJB4XSMzDQw7oeWJplE4OacnWmP4_ZvM3LmRIM9l_HG32XsrBP7-cNdBBg&usqp=CAU" });
addPost("camisetas", { elementRadio: 'camisetas', nombre: "Camiseta2", precio: 10, descripcion: "una sudadera muy bonita y caliente para el invierno. Se recomienda comprar una talla más de la que se suele usaar.", img: "https://m.media-amazon.com/images/I/617ysECwjML._AC_SX679_.jpg" });
addPost("camisetas", { elementRadio: 'camisetas', nombre: "Camiseta3", precio: 15, descripcion: "una sudadera muy bonita y caliente para el invierno. Se recomienda comprar una talla más de la que se suele usaar.", img: "https://srv.latostadora.com/image/ave_fenix_h_w--id:83392743-35eb-44d9-9985-82688df88d83;s:H_A5;b:f2f2f2;w:520;f:f;i:1356232986548135623201709265.jpg" });
addPost("camisetas", { elementRadio: 'camisetas', nombre: "Camiseta4", precio: 20, descripcion: "una sudadera muy bonita y caliente para el invierno. Se recomienda comprar una talla más de la que se suele usaar.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI0pzxf4QAYrAm8suIhDiimjNgoLD7o0ckFA&s" });
addPost("camisetas", { elementRadio: 'camisetas', nombre: "Camiseta5", precio: 10, descripcion: "una sudadera muy bonita y caliente para el invierno. Se recomienda comprar una talla más de la que se suele usaar.", img: "https://srv.latostadora.com/image/ave_fenix--id:f9e1156b-d62c-454c-a734-160d6d2f9df0;s:M_L7;b:f2f2f2;w:520;f:f;i:1356231017149013562397.jpg" });

addPost("gorros", { elementRadio: 'gorros', nombre: "Gorro1", precio: 20, descripcion: "una sudadera muy bonita y caliente para el invierno. Se recomienda comprar una talla más de la que se suele usaar.", img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/828d4f64b673f39f3dcf8cad3bf993f7.jpg?imageView2/2/w/800/q/70" });
addPost("gorros", { elementRadio: 'gorros', nombre: "Gorro2", precio: 20, descripcion: "una sudadera muy bonita y caliente para el invierno. Se recomienda comprar una talla más de la que se suele usaar.", img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/f1f6d87584829d4041f7839f0da74dbb.jpg?imageView2/2/w/800/q/70" });
addPost("gorros", { elementRadio: 'gorros', nombre: "Gorro3", precio: 10, descripcion: "una sudadera muy bonita y caliente para el invierno. Se recomienda comprar una talla más de la que se suele usaar.", img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/64bff496d61e159c93f6e6151ec26964.jpg?imageView2/2/w/800/q/70" });
addPost("gorros", { elementRadio: 'gorros', nombre: "Gorro4", precio: 20, descripcion: "una sudadera muy bonita y caliente para el invierno. Se recomienda comprar una talla más de la que se suele usaar.", img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/004f02538893c518f6bdff0e385ce24e.jpg?imageView2/2/w/800/q/70" });
addPost("gorros", { elementRadio: 'gorros', nombre: "Gorro5", precio: 5, descripcion: "una sudadera muy bonita y caliente para el invierno. Se recomienda comprar una talla más de la que se suele usaar.", img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/eb11dcd38d0089838cfad5d0cbb35987.jpg?imageView2/2/w/800/q/70" });
