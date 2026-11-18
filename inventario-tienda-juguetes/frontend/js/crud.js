const PRODUCTOS_INICIALES = [
    {
        idProducto: 1,
        nombreProducto: "Auto de carreras",
        precioProducto: 399.90,
        stockProducto: 15,
        categoriaProducto: "Vehiculos",
        imagenProducto: ""
    },
    {
        idProducto: 2,
        nombreProducto: "Oso de peluche",
        precioProducto: 299.00,
        stockProducto: 20,
        categoriaProducto: "Peluches",
        imagenProducto: ""
    },
    {
        idProducto: 3,
        nombreProducto: "Lego Classic",
        precioProducto: 499.90,
        stockProducto: 8,
        categoriaProducto: "Construccion",
        imagenProducto: ""
    }
];

const estadoInventario = {
    productos: [],
    idProductoEditando: undefined
};

let elementosInventario;

function obtenerElementosInventario() {
    return {
        formularioProducto: document.querySelector("#formularioProducto"),
        inputIdProducto: document.querySelector("#inputIdProducto"),
        inputNombreProducto: document.querySelector("#inputNombreProducto"),
        inputPrecioProducto: document.querySelector("#inputPrecioProducto"),
        inputStockProducto: document.querySelector("#inputStockProducto"),
        inputCategoriaProducto: document.querySelector("#inputCategoriaProducto"),
        inputImagenProducto: document.querySelector("#inputImagenProducto"),
        inputBusquedaProducto: document.querySelector("#inputBusquedaProducto"),
        cuerpoTablaProductos: document.querySelector("#cuerpoTablaProductos"),
        mensajeFormularioProducto: document.querySelector("#mensajeFormularioProducto"),
        mensajeListaProductos: document.querySelector("#mensajeListaProductos")
    };
}

function copiarProductosIniciales() {
    return PRODUCTOS_INICIALES.map((producto) => ({ ...producto }));
}

function cargarProductos() {
    if (!window.almacenProductos.existe()) {
        estadoInventario.productos = copiarProductosIniciales();
        window.almacenProductos.guardar(estadoInventario.productos);
        return;
    }

    estadoInventario.productos = window.almacenProductos.obtener();
}

function guardarProductos() {
    window.almacenProductos.guardar(estadoInventario.productos);
}

function obtenerProductoPorId(idProducto) {
    return estadoInventario.productos.find(
        (producto) => producto.idProducto === idProducto
    );
}

function obtenerSiguienteIdProducto() {
    return estadoInventario.productos.reduce(
        (idMayor, producto) => Math.max(idMayor, producto.idProducto),
        0
    ) + 1;
}

function obtenerDatosFormulario() {
    return {
        idProducto: Number(elementosInventario.inputIdProducto.value),
        nombreProducto: elementosInventario.inputNombreProducto.value.trim(),
        precioProducto: Number(elementosInventario.inputPrecioProducto.value),
        stockProducto: Number(elementosInventario.inputStockProducto.value),
        categoriaProducto: elementosInventario.inputCategoriaProducto.value.trim(),
        imagenProducto: elementosInventario.inputImagenProducto.value.trim()
    };
}

function mostrarProductos() {
    const textoBusqueda = elementosInventario.inputBusquedaProducto.value
        .trim()
        .toLocaleLowerCase();

    const productosFiltrados = estadoInventario.productos.filter((producto) => {
        const nombreProducto = producto.nombreProducto.toLocaleLowerCase();
        const categoriaProducto = producto.categoriaProducto.toLocaleLowerCase();

        return nombreProducto.includes(textoBusqueda)
            || categoriaProducto.includes(textoBusqueda);
    });

    window.interfazInventario.mostrarTablaProductos(
        elementosInventario.cuerpoTablaProductos,
        productosFiltrados
    );

    const mensajeProductos = textoBusqueda.length > 0
        ? `${productosFiltrados.length} producto(s) encontrado(s).`
        : `${estadoInventario.productos.length} producto(s) registrado(s).`;

    window.interfazInventario.mostrarMensaje(
        elementosInventario.mensajeListaProductos,
        mensajeProductos
    );
}

function guardarNuevoProducto(producto) {
    producto.idProducto = obtenerSiguienteIdProducto();
    estadoInventario.productos.push(producto);
}

function actualizarProducto(producto) {
    const indiceProducto = estadoInventario.productos.findIndex(
        (productoAlmacenado) => productoAlmacenado.idProducto === producto.idProducto
    );

    if (indiceProducto === -1) {
        throw new Error("No se encontro el producto que se desea actualizar.");
    }

    estadoInventario.productos[indiceProducto] = producto;
}

function guardarProducto(evento) {
    evento.preventDefault();
    window.interfazInventario.limpiarMensaje(
        elementosInventario.mensajeFormularioProducto
    );

    const producto = obtenerDatosFormulario();
    const resultadoValidacion = window.validacionesProducto.validar(producto);

    if (!resultadoValidacion.esValido) {
        window.interfazInventario.mostrarErroresFormulario(
            elementosInventario.mensajeFormularioProducto,
            resultadoValidacion.errores
        );
        return;
    }

    try {
        if (estadoInventario.idProductoEditando === undefined) {
            guardarNuevoProducto(producto);
        } else {
            producto.idProducto = estadoInventario.idProductoEditando;
            actualizarProducto(producto);
        }

        guardarProductos();
        estadoInventario.idProductoEditando = undefined;
        window.interfazInventario.limpiarFormularioProducto(elementosInventario);
        window.interfazInventario.mostrarMensaje(
            elementosInventario.mensajeFormularioProducto,
            "Producto guardado correctamente."
        );
        mostrarProductos();
    } catch (error) {
        window.interfazInventario.mostrarMensaje(
            elementosInventario.mensajeFormularioProducto,
            `No fue posible guardar el producto: ${error.message}`
        );
    }
}

function editarProducto(idProducto) {
    const producto = obtenerProductoPorId(idProducto);

    if (producto === undefined) {
        window.interfazInventario.mostrarMensaje(
            elementosInventario.mensajeListaProductos,
            "No se encontro el producto seleccionado."
        );
        return;
    }

    estadoInventario.idProductoEditando = idProducto;
    window.interfazInventario.rellenarFormularioProducto(
        elementosInventario,
        producto
    );
    window.interfazInventario.mostrarMensaje(
        elementosInventario.mensajeFormularioProducto,
        "Editando producto. Modifica los datos y guarda los cambios."
    );
    elementosInventario.inputNombreProducto.focus();
}

function eliminarProducto(idProducto) {
    const producto = obtenerProductoPorId(idProducto);

    if (producto === undefined) {
        window.interfazInventario.mostrarMensaje(
            elementosInventario.mensajeListaProductos,
            "No se encontro el producto seleccionado."
        );
        return;
    }

    const confirmarEliminacion = window.confirm(
        `¿Deseas eliminar el producto "${producto.nombreProducto}"?`
    );

    if (!confirmarEliminacion) {
        return;
    }

    estadoInventario.productos = estadoInventario.productos.filter(
        (productoAlmacenado) => productoAlmacenado.idProducto !== idProducto
    );

    try {
        guardarProductos();
        mostrarProductos();
        window.interfazInventario.mostrarMensaje(
            elementosInventario.mensajeListaProductos,
            "Producto eliminado correctamente."
        );
    } catch (error) {
        window.interfazInventario.mostrarMensaje(
            elementosInventario.mensajeListaProductos,
            `No fue posible eliminar el producto: ${error.message}`
        );
    }
}

function manejarAccionProducto(evento) {
    const botonAccion = evento.target.closest("button[data-accion]");

    if (botonAccion === null) {
        return;
    }

    const idProducto = Number(botonAccion.dataset.idProducto);

    if (botonAccion.dataset.accion === "editar") {
        editarProducto(idProducto);
        return;
    }

    if (botonAccion.dataset.accion === "eliminar") {
        eliminarProducto(idProducto);
    }
}

function cancelarEdicion() {
    estadoInventario.idProductoEditando = undefined;
    window.interfazInventario.limpiarMensaje(
        elementosInventario.mensajeFormularioProducto
    );
}

function iniciarInventario() {
    elementosInventario = obtenerElementosInventario();

    try {
        cargarProductos();
        mostrarProductos();
    } catch (error) {
        window.interfazInventario.mostrarMensaje(
            elementosInventario.mensajeListaProductos,
            `No fue posible cargar el inventario: ${error.message}`
        );
    }

    elementosInventario.formularioProducto.addEventListener("submit", guardarProducto);
    elementosInventario.formularioProducto.addEventListener("reset", cancelarEdicion);
    elementosInventario.inputBusquedaProducto.addEventListener("input", mostrarProductos);
    elementosInventario.cuerpoTablaProductos.addEventListener("click", manejarAccionProducto);
}

document.addEventListener("DOMContentLoaded", iniciarInventario);
