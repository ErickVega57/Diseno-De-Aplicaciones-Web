const FORMATO_MONEDA = "MXN";
const LOCALE_MONEDA = "es-MX";

function mostrarMensaje(elemento, mensaje) {
    elemento.textContent = mensaje;
}

function limpiarMensaje(elemento) {
    mostrarMensaje(elemento, "");
}

function mostrarErroresFormulario(elemento, errores) {
    mostrarMensaje(elemento, errores.join(" "));
}

function crearCelda(texto) {
    const celda = document.createElement("td");
    celda.textContent = texto;
    return celda;
}

function crearCeldaImagen(imagenProducto, nombreProducto) {
    const celda = document.createElement("td");

    if (
        imagenProducto.trim().length === 0
        || !window.validacionesProducto.esUrlSegura(imagenProducto)
    ) {
        celda.textContent = "Sin imagen";
        return celda;
    }

    const imagen = document.createElement("img");
    imagen.src = imagenProducto;
    imagen.alt = `Imagen de ${nombreProducto}`;
    imagen.width = 80;
    imagen.height = 80;
    imagen.addEventListener("error", () => {
        celda.textContent = "Imagen no disponible";
    });
    celda.appendChild(imagen);

    return celda;
}

function crearCeldaAcciones(idProducto) {
    const celda = document.createElement("td");
    const botonEditar = document.createElement("button");
    const botonEliminar = document.createElement("button");

    botonEditar.type = "button";
    botonEditar.textContent = "Editar";
    botonEditar.dataset.accion = "editar";
    botonEditar.dataset.idProducto = String(idProducto);

    botonEliminar.type = "button";
    botonEliminar.textContent = "Eliminar";
    botonEliminar.dataset.accion = "eliminar";
    botonEliminar.dataset.idProducto = String(idProducto);

    celda.append(botonEditar, botonEliminar);
    return celda;
}

function crearFilaProducto(producto) {
    const fila = document.createElement("tr");

    fila.append(
        crearCelda(String(producto.idProducto)),
        crearCeldaImagen(producto.imagenProducto, producto.nombreProducto),
        crearCelda(producto.nombreProducto),
        crearCelda(
            producto.precioProducto.toLocaleString(LOCALE_MONEDA, {
                style: "currency",
                currency: FORMATO_MONEDA
            })
        ),
        crearCelda(String(producto.stockProducto)),
        crearCelda(producto.categoriaProducto),
        crearCeldaAcciones(producto.idProducto)
    );

    return fila;
}

function mostrarTablaProductos(elemento, productos) {
    elemento.replaceChildren();

    if (productos.length === 0) {
        const filaVacia = document.createElement("tr");
        const celdaVacia = document.createElement("td");

        celdaVacia.colSpan = 7;
        celdaVacia.textContent = "No hay productos registrados.";
        filaVacia.appendChild(celdaVacia);
        elemento.appendChild(filaVacia);
        return;
    }

    productos.forEach((producto) => {
        elemento.appendChild(crearFilaProducto(producto));
    });
}

function rellenarFormularioProducto(elementos, producto) {
    elementos.inputIdProducto.value = String(producto.idProducto);
    elementos.inputNombreProducto.value = producto.nombreProducto;
    elementos.inputPrecioProducto.value = String(producto.precioProducto);
    elementos.inputStockProducto.value = String(producto.stockProducto);
    elementos.inputCategoriaProducto.value = producto.categoriaProducto;
    elementos.inputImagenProducto.value = producto.imagenProducto;
}

function limpiarFormularioProducto(elementos) {
    elementos.formularioProducto.reset();
    elementos.inputIdProducto.value = "";
}

window.interfazInventario = Object.freeze({
    mostrarMensaje,
    limpiarMensaje,
    mostrarErroresFormulario,
    mostrarTablaProductos,
    rellenarFormularioProducto,
    limpiarFormularioProducto
});
