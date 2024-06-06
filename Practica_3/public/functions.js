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
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,100}$/,
    imagen: /https?:\/\/[\w\-\.]+\.\w{2,5}\/?\S*/,
    precio: /^.{1,3}$/
}

const campos = {
    nombre: false,
    imagen: false,
    precio: false,
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
    e.preventDefault();

    const terminos = document.getElementById('terminos');
    if (campos.nombre && campos.imagen && campos.precio) {
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});
