const CLAVE_PRODUCTOS_INVENTARIO = "productosInventario";
const LONGITUD_MAXIMA_IMAGEN_ALMACENADA = 2048;

function esImagenAlmacenadaSegura(imagenProducto) {
    if (imagenProducto.length === 0) {
        return true;
    }

    if (imagenProducto.length > LONGITUD_MAXIMA_IMAGEN_ALMACENADA) {
        return false;
    }

    try {
        return new URL(imagenProducto).protocol === "https:";
    } catch (error) {
        return false;
    }
}

function esProductoAlmacenadoValido(producto) {
    return producto !== null
        && typeof producto === "object"
        && Number.isInteger(producto.idProducto)
        && producto.idProducto > 0
        && typeof producto.nombreProducto === "string"
        && producto.nombreProducto.trim().length > 0
        && producto.nombreProducto.length <= 100
        && Number.isFinite(producto.precioProducto)
        && producto.precioProducto > 0
        && Number.isInteger(producto.stockProducto)
        && producto.stockProducto >= 0
        && typeof producto.categoriaProducto === "string"
        && producto.categoriaProducto.trim().length > 0
        && typeof producto.imagenProducto === "string"
        && esImagenAlmacenadaSegura(producto.imagenProducto);
}

function obtenerProductosAlmacenados() {
    const productosGuardados = window.localStorage.getItem(CLAVE_PRODUCTOS_INVENTARIO);

    if (productosGuardados === null) {
        return [];
    }

    try {
        const productos = JSON.parse(productosGuardados);

        if (!Array.isArray(productos)) {
            throw new Error("Los datos almacenados no tienen el formato esperado.");
        }

        if (
            !productos.every(
                (producto) => esProductoAlmacenadoValido(producto)
                    && window.validacionesProducto.validar(producto).esValido
            )
        ) {
            throw new Error("Uno o mas productos almacenados no son validos.");
        }

        return productos;
    } catch (error) {
        throw new Error(`No fue posible leer los productos almacenados: ${error.message}`);
    }
}

function guardarProductosAlmacenados(productos) {
    window.localStorage.setItem(
        CLAVE_PRODUCTOS_INVENTARIO,
        JSON.stringify(productos)
    );
}

function existenProductosAlmacenados() {
    return window.localStorage.getItem(CLAVE_PRODUCTOS_INVENTARIO) !== null;
}

window.almacenProductos = Object.freeze({
    obtener: obtenerProductosAlmacenados,
    guardar: guardarProductosAlmacenados,
    existe: existenProductosAlmacenados
});
