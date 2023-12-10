import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const archivoGorrosBase = join(__dirname, '..', 'data', 'datosBase', 'gorros.json');
const archivoSudaderasBase = join(__dirname, '..', 'data', 'datosBase', 'sudaderas.json');
const archivoCamisetasBase = join(__dirname, '..', 'data', 'datosBase', 'camisetas.json');
const archivoResenassBase = join(__dirname, '..', 'data', 'datosBase', 'resenas.json');
const archivoGorros = join(__dirname, '..', 'data', 'gorrosService.json');
const archivoSudaderas = join(__dirname, '..', 'data', 'sudaderasService.json');
const archivoCamisetas = join(__dirname, '..', 'data', 'camisetasService.json');
const archivoResenas = join(__dirname, '..', 'data', 'resenas.json');


export const iniciarArchivosDeElementos = async () => {
    try {
        const gorrosBase = readFileSync(archivoGorrosBase, 'utf8');
        const sudaderasBase = readFileSync(archivoSudaderasBase, 'utf8');
        const camisetasBase = readFileSync(archivoCamisetasBase, 'utf8');
        const resenasBase = readFileSync(archivoResenassBase, 'utf8');

        writeFileSync(nombreDeArchivosPorCategoria("gorros"), gorrosBase, 'utf8');
        writeFileSync(nombreDeArchivosPorCategoria("sudaderas"), sudaderasBase, 'utf8');
        writeFileSync(nombreDeArchivosPorCategoria("camisetas"), camisetasBase, 'utf8');
        writeFileSync(nombreDeArchivosPorCategoria("resenas"), resenasBase, 'utf8');
    } catch (error) {
        console.error(`Error al leer el archivo base: ${error.message}`);
        return null
    }

}

const nombreDeArchivosPorCategoria = (categoria) => {
    switch (categoria) {
        case "gorros":
            return archivoGorros
        case "sudaderas":
            return archivoSudaderas
        case "camisetas":
            return archivoCamisetas
        case "resenas":
            return archivoResenas
        default:
            break;
    }
}

const existeElemento = (categoria, id) => {
    const elementos = obtenerElementos();
    return elementos[categoria].findIndex((el) => (el.id === id));
}

const generarNuevoId = (categoria) => {
    const elementos = obtenerElementos();
    if (elementos[categoria].length > 0) {
        const elementoPorCategoria = elementos[categoria].sort((a, b) => a.id - b.id);
        const ultimoElemento = elementoPorCategoria[elementoPorCategoria.length - 1]
        return ultimoElemento.id + 1
    }
    return 1
}

export const obtenerElementos = () => {
    try {
        const gorros = readFileSync(archivoGorros, 'utf8');
        const sudaderas = readFileSync(archivoSudaderas, 'utf8');
        const camisetas = readFileSync(archivoCamisetas, 'utf8');
        const datos = { gorros: JSON.parse(gorros), sudaderas: JSON.parse(sudaderas), camisetas: JSON.parse(camisetas) }
        return datos
    } catch (error) {
        console.error(`Error al leer el archivo de gorros: ${error.message}`);
        return null
    }
}

export const obtenerElemento = (categoria, id) => {
    const respuestaExisteElemento = existeElemento(categoria, id)
    if (respuestaExisteElemento === -1) {
        return null
    }
    const elementos = obtenerElementos();
    const elemento = elementos[categoria].find((el) => (el.id === id));
    return elemento;
}


export const guardarElemento = (elemento) => {
    if (elemento.id) {
        const categoria = elemento.categoria
        const respuestaExisteElemento = existeElemento(categoria, elemento.id)
        if (respuestaExisteElemento !== -1) {
            const elementos = obtenerElementos();
            elementos[categoria].splice(respuestaExisteElemento, 1, elemento)
            const datos = JSON.stringify(elementos[categoria], null, 2);
            writeFileSync(nombreDeArchivosPorCategoria(categoria), datos, 'utf8');
            return elemento.id
        }
        return null;
    }
}

export const crearElemento = (elemento) => {
    const categoria = elemento.categoria
    const copiaNuevoElemento = { ...elemento }
    const idNuevo = generarNuevoId(categoria)
    copiaNuevoElemento.id = idNuevo
    const elementos = obtenerElementos();
    elementos[categoria].push(copiaNuevoElemento)
    const datos = JSON.stringify(elementos[categoria], null, 2);
    writeFileSync(nombreDeArchivosPorCategoria(categoria), datos, 'utf8');
    return idNuevo
}


export const borrarElemento = (categoria, id) => {
    const respuestaExisteElemento = existeElemento(categoria, id)
    if (respuestaExisteElemento === -1) {
        return false
    }
    const elementos = obtenerElementos();
    elementos[categoria].splice(respuestaExisteElemento, 1)
    const datos = JSON.stringify(elementos[categoria], null, 2);
    writeFileSync(nombreDeArchivosPorCategoria(categoria), datos, 'utf8');
    return true
}


export const obtenerResenasDeLosElementos = () => {
    try {
        const resenas = readFileSync(archivoResenas, 'utf8');
        return JSON.parse(resenas)
    } catch (error) {
        console.error(`Error al leer el archivo de las reseñas: ${error.message}`);
        return null
    }
}

export const obtenerResenaDelElemento = (categoria, id) => {
    const resenas = obtenerResenasDeLosElementos();
    return resenas.filter((el) => {
        return (parseInt(el.id) === id && el.categoria === categoria)
    });
}

export const crearResenaDelElemento = (resena) => {
    const copiaResena = { ...resena }
    const resenas = obtenerResenasDeLosElementos();
    resenas.push(copiaResena)
    const datos = JSON.stringify(resenas, null, 2);
    writeFileSync(nombreDeArchivosPorCategoria("resenas"), datos, 'utf8');
}





