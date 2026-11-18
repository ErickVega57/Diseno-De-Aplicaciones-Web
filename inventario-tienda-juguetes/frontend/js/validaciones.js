const CATEGORIAS_PRODUCTO = Object.freeze([
    "Construccion",
    "Figuras de accion",
    "Juegos de mesa",
    "Juguetes educativos",
    "Manualidades",
    "Muñecas",
    "Peluches",
    "Primera infancia",
    "Vehiculos",
    "Juguetes de aire libre"
]);

const LONGITUD_MAXIMA_NOMBRE_PRODUCTO = 100;
const LONGITUD_MAXIMA_IMAGEN_PRODUCTO = 2048;

function esUrlImagenSegura(imagenProducto) {
    if (imagenProducto.trim().length === 0) {
        return true;
    }

    try {
        const urlImagen = new URL(imagenProducto);
        return urlImagen.protocol === "https:";
    } catch (error) {
        return false;
    }
}

function validarProducto(producto) {
    const errores = [];

    if (producto.nombreProducto.trim().length === 0) {
        errores.push("El nombre del producto es obligatorio.");
    }

    if (producto.nombreProducto.length > LONGITUD_MAXIMA_NOMBRE_PRODUCTO) {
        errores.push("El nombre del producto es demasiado largo.");
    }

    if (!Number.isFinite(producto.precioProducto) || producto.precioProducto <= 0) {
        errores.push("El precio debe ser un numero mayor que cero.");
    }

    if (!Number.isInteger(producto.stockProducto) || producto.stockProducto < 0) {
        errores.push("El stock debe ser un numero entero igual o mayor que cero.");
    }

    if (producto.categoriaProducto.trim().length === 0) {
        errores.push("La categoria del producto es obligatoria.");
    }

    if (!CATEGORIAS_PRODUCTO.includes(producto.categoriaProducto)) {
        errores.push("La categoria seleccionada no es valida.");
    }

    if (producto.imagenProducto.length > LONGITUD_MAXIMA_IMAGEN_PRODUCTO) {
        errores.push("La URL de la imagen es demasiado larga.");
    }

    if (!esUrlImagenSegura(producto.imagenProducto)) {
        errores.push("La imagen debe utilizar una URL HTTPS valida.");
    }

    return {
        esValido: errores.length === 0,
        errores
    };
}

window.validacionesProducto = Object.freeze({
    validar: validarProducto,
    esUrlSegura: esUrlImagenSegura
});
