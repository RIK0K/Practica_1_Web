

document.addEventListener('DOMContentLoaded', function () {
  const contenedorCamisetas = document.getElementById('camisetas');
  const contenedorSudaderas = document.getElementById('sudaderas');
  const contenedorGorros = document.getElementById('gorros');

  fetch('http://localhost:3000/elementos')
    .then(response => response.json())
    .then(productos => {
      // Iterar sobre el array de productos
      productos["camisetas"].forEach(producto => {
        // Crear un nuevo elemento <div> para cada producto
        const nuevoProducto = document.createElement('div');
        nuevoProducto.className = 'org-product';

        // Crear un enlace <a> para cada producto (opcional)
        const enlaceProducto = document.createElement('a');
        enlaceProducto.href = `Producto.html?id=${producto.id}&categoria=${producto.categoria}`; // Puedes poner la URL de la página del producto

        // Crear una imagen <img> para cada producto
        const imagenProducto = document.createElement('img');
        imagenProducto.className = 'product-photo';
        imagenProducto.src = producto.imagen;

        // Agregar la imagen al enlace (opcional)
        enlaceProducto.appendChild(imagenProducto);

        // Agregar el enlace al nuevo producto (opcional)
        nuevoProducto.appendChild(enlaceProducto);

        // Puedes seguir agregando más detalles como nombre, precio, descripción, etc.

        // Agregar el nuevo producto al contenedor
        contenedorCamisetas.appendChild(nuevoProducto);
      });
      productos["sudaderas"].forEach(producto => {
        // Crear un nuevo elemento <div> para cada producto
        const nuevoProducto = document.createElement('div');
        nuevoProducto.className = 'org-product';

        // Crear un enlace <a> para cada producto (opcional)
        const enlaceProducto = document.createElement('a');
        enlaceProducto.href = `Producto.html?id=${producto.id}&categoria=${producto.categoria}`; // Puedes poner la URL de la página del producto

        // Crear una imagen <img> para cada producto
        const imagenProducto = document.createElement('img');
        imagenProducto.className = 'product-photo';
        imagenProducto.src = producto.imagen;

        // Agregar la imagen al enlace (opcional)
        enlaceProducto.appendChild(imagenProducto);

        // Agregar el enlace al nuevo producto (opcional)
        nuevoProducto.appendChild(enlaceProducto);

        // Puedes seguir agregando más detalles como nombre, precio, descripción, etc.

        // Agregar el nuevo producto al contenedor
        contenedorSudaderas.appendChild(nuevoProducto);
      });
      productos["gorros"].forEach(producto => {
        // Crear un nuevo elemento <div> para cada producto
        const nuevoProducto = document.createElement('div');
        nuevoProducto.className = 'org-product';

        // Crear un enlace <a> para cada producto (opcional)
        const enlaceProducto = document.createElement('a');
        enlaceProducto.href = `Producto.html?id=${producto.id}&categoria=${producto.categoria}`; // Puedes poner la URL de la página del producto

        // Crear una imagen <img> para cada producto
        const imagenProducto = document.createElement('img');
        imagenProducto.className = 'product-photo';
        imagenProducto.src = producto.imagen;

        // Agregar la imagen al enlace (opcional)
        enlaceProducto.appendChild(imagenProducto);

        // Agregar el enlace al nuevo producto (opcional)
        nuevoProducto.appendChild(enlaceProducto);

        // Puedes seguir agregando más detalles como nombre, precio, descripción, etc.

        // Agregar el nuevo producto al contenedor
        contenedorGorros.appendChild(nuevoProducto);
      });
    })
    .catch(error => {
      console.error('Error al hacer la solicitud:', error);
    });
});
