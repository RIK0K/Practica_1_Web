

document.addEventListener('DOMContentLoaded', function () {
  // Obtener los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const categoria = urlParams.get('categoria');

  fetch(`http://localhost:3000/elementos/${categoria}/${id}`)
    .then(response => response.json())
    .then(producto => {
      console.log(producto)
      document.addEventListener('DOMContentLoaded', function () {
        console.log(producto)
        const prodTitleElement = document.getElementById('prod_title');
        prodTitleElement.innerText = producto.nombre;
        const prodDescrElement = document.getElementById('prod_description');
        prodDescrElement.innerText = producto.descripcion;


      });
    })
    .catch(error => {
      console.error('Error al hacer la solicitud:', error);
    });
});
