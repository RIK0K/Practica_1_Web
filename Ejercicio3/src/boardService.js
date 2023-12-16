const posts = {
    camisetas: new Map(),
    sudaderas: new Map(),
    gorros: new Map(),
};
let nextId = 0;


// Se incrementa en 1 el id para el siguiente elemento, se guarda en el mapa.
export const addPost = (elementRadio, post) => {
    // if (!posts[elementRadio] || !(posts[elementRadio] instanceof Map)) {
    //   posts[elementRadio] = new Map();
    //}

    let id = nextId++;
    post.id = id.toString();
    posts[elementRadio].set(post.id, post);
}



// Se elimina un elemento del mapa
export const deletePostost = (elementRadio, id) => {
    posts[elementRadio].delete(id);
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


// Ejemplos de uso: se añaden varios posts a las categorías 'sudaderas', 'camisetas' y 'gorros'.
addPost("sudaderas", { img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/293a76d0f5e97b6853ee64e6af02875d.jpg?imageView2/2/w/800/q/70" });
addPost("sudaderas", { img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/79cfe040ec56194cb973b68c20e12418.jpg?imageView2/2/w/800/q/70" });
addPost("sudaderas", { img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/d259fefb123d2776e72797e67eec8606.jpg?imageView2/2/w/800/q/70" });
addPost("sudaderas", { img: "https://img.kwcdn.com/product/open/2023-11-28/1701176876994-7519af7b53d7417f9214159b794def69-goods.jpeg?imageView2/2/w/800/q/70" });

addPost("camisetas", { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcL1d8maC63fJB4XSMzDQw7oeWJplE4OacnWmP4_ZvM3LmRIM9l_HG32XsrBP7-cNdBBg&usqp=CAU" });
addPost("camisetas", { img: "https://m.media-amazon.com/images/I/617ysECwjML._AC_SX679_.jpg" });
addPost("camisetas", { img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.redbubble.com%2Fes%2Fshop%2Fel%2Bave%2Bfenix%2Bwomens-clothes&psig=AOvVaw2Der-w1-ZTyYsB3M52fZR0&ust=1702416406066000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMiN2rqpiIMDFQAAAAAdAAAAABAS" });
addPost("camisetas", { img: "https://lovecamisetas.com/wp-content/uploads/2021/07/camiseta-negra-ave-fenix-ok.jpg" });
addPost("camisetas", { img: "https://image.spreadshirtmedia.net/image-server/v1/products/T6A5PA5835PT17X29Y28D160103111W22583H42310/views/1,width=120,height=120,appearanceId=5,backgroundColor=F2F2F2,modelId=1081,crop=detail/fenix-negro-camiseta-hombre.jpg" });

addPost("gorros", { img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/828d4f64b673f39f3dcf8cad3bf993f7.jpg?imageView2/2/w/800/q/70" });
addPost("gorros", { img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/f1f6d87584829d4041f7839f0da74dbb.jpg?imageView2/2/w/800/q/70" });
addPost("gorros", { img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/64bff496d61e159c93f6e6151ec26964.jpg?imageView2/2/w/800/q/70" });
addPost("gorros", { img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/004f02538893c518f6bdff0e385ce24e.jpg?imageView2/2/w/800/q/70" });
addPost("gorros", { img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/eb11dcd38d0089838cfad5d0cbb35987.jpg?imageView2/2/w/800/q/70" });
