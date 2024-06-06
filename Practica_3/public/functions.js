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