function cambiarTema() {
    const temaActual = document.body.getAttribute("data-bs-theme");
    const nuevoTema = temaActual === "light" ? "dark" : "light";

    // Guardar el tema seleccionado en localStorage
    localStorage.setItem("tema", nuevoTema);

    // Actualizar el tema en el body
    document.body.setAttribute("data-bs-theme", nuevoTema);

    // Actualizar el icono según el nuevo tema
    const icono = document.querySelector("#dl-icon");
    icono.setAttribute("class", nuevoTema === "light" ? "bi bi-moon-fill" : "bi bi-sun-fill");
}



// Verificar si hay un tema almacenado en localStorage al cargar la página
function ejecutarTema() {
    const temaAlmacenado = localStorage.getItem("tema");
    if (temaAlmacenado) {
        document.body.setAttribute("data-bs-theme", temaAlmacenado);
        const icono = document.querySelector("#dl-icon");
        icono.setAttribute("class", temaAlmacenado === "light" ? "bi bi-moon-fill" : "bi bi-sun-fill");
    }
}




// Comprobacion de datos del formulario
async function formValidation() {
    // Obtener el formulario y todos los inputs y textareas dentro del formulario
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#formulario input, #formulario textarea');

    // Expresiones regulares para validar cada campo del formulario
    const expresiones = {
        nombre: /^[A-ZÀ-ÿ0-9][a-zA-ZÀ-ÿ\s0-9]{0,99}$/,
        imagen: /https?:\/\/[\w\-\.]+\/[\w\-\.\/]+.(jpg|jpeg|png|gif|bmp|svg)\b|data:image\/[a-zA-Z]+;base64,[\w=+\/]+|img\.brave\.[\w\-\.]+/,
        descripcion: /^.{50,500}$/,
        precio: /^(?:[1-9][0-9]{0,2}(?:\.[0-9]{1,2})?|1\.[0-9]{1,2})$/
    };

    // Estado de validación de cada campo
    const campos = {
        nombre: false,
        imagen: false,
        precio: false,
        descripcion: false
    };

    // Función para validar cada campo según la expresión regular correspondiente
    const validarCampo = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
            // Si el valor cumple con la expresión regular, se marca como correcto
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
            campos[campo] = true; // Se marca como válido en el objeto campos
        } else {
            // Si no cumple, se marca como incorrecto
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
            campos[campo] = false; // Se marca como inválido en el objeto campos
        }
    };

    // Función para validar el formulario al teclear o al perder el foco
    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "nombre":
                validarCampo(expresiones.nombre, e.target, 'nombre');
                break;
            case "img":
                validarCampo(expresiones.imagen, e.target, 'imagen');
                break;
            case "precio":
                validarCampo(expresiones.precio, e.target, 'precio');
                break;
            case "descripcion":
                validarCampo(expresiones.descripcion, e.target, 'descripcion');
                break;
        }
    };

    // Asociar eventos de validación a cada input y textarea del formulario
    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    // Validar el formulario al momento de enviarlo
    formulario.addEventListener('submit', (e) => {
        if (!(campos.nombre && campos.imagen && campos.precio && campos.descripcion && document.getElementById('NoDisponible') === null)) {
            // Si algún campo no es válido, se evita el envío del formulario
            e.preventDefault();
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        } else {
            // Si todos los campos son válidos, se muestra un mensaje de éxito
            document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
            setTimeout(() => {
                document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
            }, 5000);

            // Se remueve la clase de 'formulario__grupo-correcto' de todos los elementos
            document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
                icono.classList.remove('formulario__grupo-correcto');
            });
        }
    });
}



async function checknombreAvailability() {

    let nombreInput = document.getElementById('nombre');

    let nombre = nombreInput.value;

    const response = await fetch(`/availablenombre?nombre=${nombre}`);

    const responseObj = await response.json();

    let message = responseObj.available? 
        '<p id="Disponible">Disponible</p>':
        '<p id="NoDisponible">No disponible</p>';

    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = message;

}

async function checknombreEditarAvailability() {

    let nombreInput = document.getElementById('nombre');
    let nombre = nombreInput.value;
    let message;
    let nombreOriginal = document.getElementById('nombreOriginal').innerText;
    const response = await fetch(`/availablenombre?nombre=${nombre}`);

    const responseObj = await response.json();
    if (nombre === nombreOriginal) {
        message = '<p id="Disponible">Mismo Nombre</p>';}
    else{
        message = responseObj.available? 
            '<p id="Disponible">Disponible</p>':
            '<p id="NoDisponible">No disponible</p>';
    }
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = message;
}















document.addEventListener('DOMContentLoaded', function () {
    // Espera a que se cargue completamente el DOM antes de ejecutar el código
    
    document.querySelectorAll('.load-more').forEach(button => {
        // Itera sobre todos los elementos con la clase '.load-more'
        
        button.addEventListener('click', function () {
            // Agrega un evento de clic a cada botón con la clase '.load-more'
            
            const type = this.dataset.type;
            // Obtiene el valor del atributo 'data-type' del botón actual
            
            const skip = document.querySelectorAll(`.${type}-product`).length;
            // Cuenta cuántos elementos ya existen con la clase '.{type}-product' para determinar el valor de 'skip'
            
            fetch(`/loadMore?elementRadio=${type}&skip=${skip}&limit=3`)
                // Realiza una solicitud fetch para obtener más productos
                .then(response => response.json())
                // Convierte la respuesta en formato JSON
                .then(products => {
                    // Maneja los productos recibidos
                    
                    const container = document.querySelector(`.org-product.${type}`);
                    // Encuentra el contenedor donde se agregarán los nuevos productos
                    
                    products.forEach(product => {
                        // Itera sobre cada producto recibido
                        
                        const productDiv = document.createElement('div');
                        // Crea un nuevo elemento 'div' para cada producto
                        
                        productDiv.innerHTML = `
                            <a href="post/${product.id},${type}">
                                <img class="product-photo" src="${product.img}" alt="${product.nombre}">
                            </a>
                        `;
                        // Define el contenido HTML para el nuevo producto, que incluye una imagen y un enlace
                        
                        productDiv.classList.add(`${type}-product`);
                        // Agrega la clase correspondiente al nuevo producto
                        
                        container.appendChild(productDiv);
                        // Agrega el nuevo producto al contenedor
                    });
                })
                .catch(error => console.error('Error loading more products:', error));
                // Maneja cualquier error que pueda ocurrir durante la carga de productos
        });
    });
});



// Contadores de productos mostrados
let productCounts = {
    camisetas: 0,
    sudaderas: 0,
    gorros: 0
};

function loadInitialProduct() {
    const productContainers = document.querySelectorAll('.product-container');
    
    productContainers.forEach(container => {
        const type = container.getAttribute('data-type');
        fetch(`/loadMore?elementRadio=${type}&skip=${productCounts[type]}`)
            .then(response => response.json())
            .then(products => {
                products.forEach(product => {
                    const productElement = document.createElement('a');
                    productElement.innerHTML = `
                        <a href="post/${product.id},${type}">
                            <img class="product-photo" src="${product.img}">
                        </a>
                    `;
                    container.appendChild(productElement);
                });
                productCounts[type] += products.length; // Actualizar el contador
            });
    });
}

// Cargar los productos iniciales cuando la página se carga
loadInitialProduct();

function filterSudadera(){
    var x = document.getElementById("filtroCamisetas");
    var y = document.getElementById("filtroGorros");
    var z = document.getElementById("filtroSudaderas");

    if (x.style.display === "none" && y.style.display === "none") {
        x.style.display = "block";
        y.style.display = "block";
        z.style.display = "block";
    }else{
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "block";
    }
}

function filterCamiseta(){
    var x = document.getElementById("filtroSudaderas");
    var y = document.getElementById("filtroGorros");
    var z = document.getElementById("filtroCamisetas");


    if (x.style.display === "none" && y.style.display === "none") {
        x.style.display = "block";
        y.style.display = "block";
        z.style.display = "block";
    }else{
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "block";
    }
}

function filterGorro(){
    var x = document.getElementById("filtroCamisetas");
    var y = document.getElementById("filtroSudaderas");
    var z = document.getElementById("filtroGorros");

    if (x.style.display === "none" && y.style.display === "none") {
        x.style.display = "block";
        y.style.display = "block";
        z.style.display = "block";

    }else{
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "block";
    }
}

function noFilter(){
    var x = document.getElementById("filtroCamisetas");
    var y = document.getElementById("filtroSudaderas");
    var z = document.getElementById("filtroGorros");

        x.style.display = "block";
        y.style.display = "block";
        z.style.display = "block";

}