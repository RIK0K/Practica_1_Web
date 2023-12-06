// main.js
$(document).ready(function() {
    // Cargar elementos al cargar la página
    cargarElementos();
  
    function cargarElementos() {
      // Realizar solicitud al servidor para obtener elementos
      $.get('/api/elementos', function(data) {
        mostrarElementos(data);
      });
    }
  
    function mostrarElementos(elementos) {
      const container = $('#elementosContainer');
      container.empty();
  
      elementos.forEach(function(elemento) {
        // Crear elementos en la interfaz (lista o grid)
        const elementoHTML = `<div>
                                <h3>${elemento.nombre}</h3>
                                <p>Precio: ${elemento.precio}€</p>
                                <button onclick="editarElemento(${elemento.id})">Editar</button>
                                <button onclick="eliminarElemento(${elemento.id})">Eliminar</button>
                              </div>`;
        container.append(elementoHTML);
      });
    }
  
    // Función para editar elemento (puedes implementar la lógica según tus necesidades)
    window.editarElemento = function(id) {
      console.log(`Editar elemento con ID: ${id}`);
    }
  
    // Función para eliminar elemento (puedes implementar la lógica según tus necesidades)
    window.eliminarElemento = function(id) {
      console.log(`Eliminar elemento con ID: ${id}`);
    }
  }); 