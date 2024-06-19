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
async function formValidation(){
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#formulario input, #formulario textarea');

    

    const expresiones = {
        nombre: /^[A-ZÀ-ÿ0-9][a-zA-ZÀ-ÿ\s0-9]{0,99}$/,
        imagen: /https?:\/\/[\w\-\.]+\/[\w\-\.\/]+.(jpg|jpeg|png|gif|bmp|svg)\b|data:image\/[a-zA-Z]+;base64,[\w=+\/]+|img\.brave\.[\w\-\.]+/,
        descripcion: /^.{50,500}$/,
        precio: /^(?:[1-9][0-9]{0,2}(?:\.[0-9]{1,2})?|1\.[0-9]{1,2})$/
    }
    const campos = {
        nombre: false,
        imagen: false,
        precio: false,
        descripcion: false
    }

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
    }

    const validarCampo = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
            campos[campo] = true;
        } else {
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
            campos[campo] = false;
        }
    }

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    formulario.addEventListener('submit', (e) => {
        if (!(campos.nombre && campos.imagen && campos.precio && campos.descripcion && document.getElementById('NoDisponible') === null)) {
            e.preventDefault();
    
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        } else {
            document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
            setTimeout(() => {
                document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
            }, 5000);
    
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
    document.querySelectorAll('.load-more').forEach(button => {
        button.addEventListener('click', function () {
            const type = this.dataset.type;
            const skip = document.querySelectorAll(`.${type}-product`).length;

            fetch(`/loadMore?elementRadio=${type}&skip=${skip}&limit=3`)
                .then(response => response.json())
                .then(products => {
                    const container = document.querySelector(`.org-product.${type}`);
                    products.forEach(product => {
                        const productDiv = document.createElement('div');
                        productDiv.innerHTML = `
                            <a href="post/${product.id},${type}">
                                <img class="product-photo" src="${product.img}" alt="${product.nombre}">
                            </a>
                        `;
                        productDiv.classList.add(`${type}-product`);
                        container.appendChild(productDiv);
                    });
                })
                .catch(error => console.error('Error loading more products:', error));
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

function loadMoreProducts(type) {
    const container = document.querySelector(`.product-container[data-type="${type}"]`);
    fetch(`/loadMore?elementRadio=${type}&skip=${productCounts[type]}`)
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.innerHTML = `
                    <a href="post/${product.id},${type}">
                        <img class="product-photo" src="${product.img}">
                    </a>
                `;
                container.appendChild(productElement);
            });
            productCounts[type] += products.length; // Actualizar el contador
        });
}

// Asignar eventos a los botones de "Cargar más"
document.querySelectorAll('.load-more').forEach(button => {
    button.addEventListener('click', (event) => {
        const type = event.target.getAttribute('data-type');
        loadMoreProducts(type);
    });
});

// Cargar los productos iniciales cuando la página se carga
loadInitialProduct();
