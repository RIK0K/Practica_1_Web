const posts = {
    camisetas: new Map(),
    sudaderas: new Map(),
    gorros: new Map(),
};

let nextId = 0;

export const addPost = (elementRadio, post) => {
    // Verifica si posts[category] existe y es un objeto Map
    if (!posts[elementRadio] || !(posts[elementRadio] instanceof Map)) {
        // Inicializa posts[category] como un nuevo objeto Map
        posts[elementRadio] = new Map();
    }

    let id = nextId++;
    post.id = id.toString();
    posts[elementRadio].set(post.id, post);
}


export const deletePostost = (elementRadio,id) => {
    posts[elementRadio].delete(id);
}



export function getPosts(elementRadio) {
    return [...posts[elementRadio].values()];
}


export const getPost = (elementRadio, id) => {
    if (posts[elementRadio]) {
        return posts[elementRadio].get(id);
    } else {
       
        console.error(`La categoría '${elementRadio}' no existe.`);
        return null; // O algo que indique que no se encontró el post
    }
}


addPost("sudaderas", { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcL1d8maC63fJB4XSMzDQw7oeWJplE4OacnWmP4_ZvM3LmRIM9l_HG32XsrBP7-cNdBBg&usqp=CAU" });
addPost("sudaderas", { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcL1d8maC63fJB4XSMzDQw7oeWJplE4OacnWmP4_ZvM3LmRIM9l_HG32XsrBP7-cNdBBg&usqp=CAU" });
addPost("sudaderas", { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcL1d8maC63fJB4XSMzDQw7oeWJplE4OacnWmP4_ZvM3LmRIM9l_HG32XsrBP7-cNdBBg&usqp=CAU" });
addPost("sudaderas", { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcL1d8maC63fJB4XSMzDQw7oeWJplE4OacnWmP4_ZvM3LmRIM9l_HG32XsrBP7-cNdBBg&usqp=CAU"});
addPost("sudaderas", { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcL1d8maC63fJB4XSMzDQw7oeWJplE4OacnWmP4_ZvM3LmRIM9l_HG32XsrBP7-cNdBBg&usqp=CAU"});



addPost("camisetas", { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcL1d8maC63fJB4XSMzDQw7oeWJplE4OacnWmP4_ZvM3LmRIM9l_HG32XsrBP7-cNdBBg&usqp=CAU"  });
addPost("camisetas", { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcL1d8maC63fJB4XSMzDQw7oeWJplE4OacnWmP4_ZvM3LmRIM9l_HG32XsrBP7-cNdBBg&usqp=CAU"  });
addPost("camisetas", { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcL1d8maC63fJB4XSMzDQw7oeWJplE4OacnWmP4_ZvM3LmRIM9l_HG32XsrBP7-cNdBBg&usqp=CAU" });
addPost("camisetas", { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcL1d8maC63fJB4XSMzDQw7oeWJplE4OacnWmP4_ZvM3LmRIM9l_HG32XsrBP7-cNdBBg&usqp=CAU" });
addPost("camisetas", { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcL1d8maC63fJB4XSMzDQw7oeWJplE4OacnWmP4_ZvM3LmRIM9l_HG32XsrBP7-cNdBBg&usqp=CAU" });

addPost("gorros", { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcL1d8maC63fJB4XSMzDQw7oeWJplE4OacnWmP4_ZvM3LmRIM9l_HG32XsrBP7-cNdBBg&usqp=CAU" });
addPost("gorros", { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcL1d8maC63fJB4XSMzDQw7oeWJplE4OacnWmP4_ZvM3LmRIM9l_HG32XsrBP7-cNdBBg&usqp=CAU" });
addPost("gorros", { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcL1d8maC63fJB4XSMzDQw7oeWJplE4OacnWmP4_ZvM3LmRIM9l_HG32XsrBP7-cNdBBg&usqp=CAU"  });
addPost("gorros", { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcL1d8maC63fJB4XSMzDQw7oeWJplE4OacnWmP4_ZvM3LmRIM9l_HG32XsrBP7-cNdBBg&usqp=CAU" });
addPost("gorros", { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcL1d8maC63fJB4XSMzDQw7oeWJplE4OacnWmP4_ZvM3LmRIM9l_HG32XsrBP7-cNdBBg&usqp=CAU" });
