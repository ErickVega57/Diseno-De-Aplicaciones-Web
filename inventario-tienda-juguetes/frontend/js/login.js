const RUTA_AUTENTICACION = "../../backend/auth/login.php";
const CLAVE_USUARIO_RECORDADO = "usuarioRecordado";
const MODO_DEMO_LOGIN = true;
const LONGITUD_MAXIMA_CREDENCIAL = 100;
const MENSAJE_CREDENCIALES_INVALIDAS = "No fue posible iniciar sesion con los datos proporcionados.";
const MENSAJE_ERROR_CONEXION = "No fue posible comunicarse con el servicio de inicio de sesion.";

let elementosLogin;

function obtenerElementosLogin() {
    return {
        formulario: document.querySelector("#formularioLogin"),
        usuario: document.querySelector("#inputUsuario"),
        contrasena: document.querySelector("#inputContrasena"),
        botonMostrarContrasena: document.querySelector("#botonMostrarContrasena"),
        iconoContrasenaAbierta: document.querySelector("#iconoContrasenaAbierta"),
        iconoContrasenaCerrada: document.querySelector("#iconoContrasenaCerrada"),
        recordarUsuario: document.querySelector("#recordarUsuario"),
        boton: document.querySelector("#botonIniciarSesion"),
        mensaje: document.querySelector("#mensajeLogin")
    };
}

function mostrarMensajeLogin(mensaje, esError = true) {
    elementosLogin.mensaje.textContent = mensaje;
    elementosLogin.mensaje.classList.toggle("error", esError);
    elementosLogin.mensaje.classList.toggle("exito", !esError);
}

function limpiarMensajeLogin() {
    mostrarMensajeLogin("", true);
}

function obtenerDatosLogin() {
    return {
        usuario: elementosLogin.usuario.value.trim(),
        contrasena: elementosLogin.contrasena.value
    };
}

function validarDatosLogin(datosLogin) {
    const errores = [];

    if (datosLogin.usuario.length === 0) {
        errores.push("El usuario es obligatorio.");
    }

    if (datosLogin.contrasena.length === 0) {
        errores.push("La contraseña es obligatoria.");
    }

    if (datosLogin.usuario.length > LONGITUD_MAXIMA_CREDENCIAL) {
        errores.push("El usuario excede la longitud permitida.");
    }

    if (datosLogin.contrasena.length > LONGITUD_MAXIMA_CREDENCIAL) {
        errores.push("La contraseña excede la longitud permitida.");
    }

    return errores;
}

function guardarUsuarioRecordado(usuario) {
    if (!elementosLogin.recordarUsuario.checked) {
        window.localStorage.removeItem(CLAVE_USUARIO_RECORDADO);
        return;
    }

    window.localStorage.setItem(CLAVE_USUARIO_RECORDADO, usuario);
}

function cargarUsuarioRecordado() {
    const usuarioRecordado = window.localStorage.getItem(CLAVE_USUARIO_RECORDADO);

    if (usuarioRecordado === null) {
        return;
    }

    elementosLogin.usuario.value = usuarioRecordado;
    elementosLogin.recordarUsuario.checked = true;
}

function alternarVisibilidadContrasena() {
    const mostrarContrasena = elementosLogin.contrasena.type === "password";

    elementosLogin.contrasena.type = mostrarContrasena ? "text" : "password";
    elementosLogin.botonMostrarContrasena.setAttribute(
        "aria-label",
        mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"
    );
    elementosLogin.botonMostrarContrasena.setAttribute(
        "title",
        mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"
    );
    elementosLogin.botonMostrarContrasena.setAttribute(
        "aria-pressed",
        String(mostrarContrasena)
    );
    elementosLogin.iconoContrasenaAbierta.classList.toggle(
        "iconoContrasenaOculto",
        !mostrarContrasena
    );
    elementosLogin.iconoContrasenaCerrada.classList.toggle(
        "iconoContrasenaOculto",
        mostrarContrasena
    );
    elementosLogin.iconoContrasenaAbierta.setAttribute(
        "aria-hidden",
        String(!mostrarContrasena)
    );
    elementosLogin.iconoContrasenaCerrada.setAttribute(
        "aria-hidden",
        String(mostrarContrasena)
    );
}

async function autenticarUsuario(datosLogin) {
    if (MODO_DEMO_LOGIN) {
        return autenticarUsuarioDemo(datosLogin);
    }

    const respuesta = await fetch(RUTA_AUTENTICACION, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(datosLogin)
    });

    let resultado;

    try {
        resultado = await respuesta.json();
    } catch (error) {
        throw new Error("La respuesta del servidor no tiene un formato valido.");
    }

    if (!respuesta.ok || resultado.autenticado !== true) {
        throw new Error(MENSAJE_CREDENCIALES_INVALIDAS);
    }

    return resultado;
}

async function manejarEnvioLogin(evento) {
    evento.preventDefault();
    limpiarMensajeLogin();

    const datosLogin = obtenerDatosLogin();
    const errores = validarDatosLogin(datosLogin);

    if (errores.length > 0) {
        mostrarMensajeLogin(errores.join(" "));
        return;
    }

    elementosLogin.boton.disabled = true;

    try {
        await autenticarUsuario(datosLogin);
        guardarUsuarioRecordado(datosLogin.usuario);
        elementosLogin.contrasena.value = "";
        mostrarMensajeLogin("Inicio de sesion correcto. Redirigiendo...", false);
        window.location.assign("inventario.html");
    } catch (error) {
        const mensaje = error.message === MENSAJE_CREDENCIALES_INVALIDAS
            ? error.message
            : MENSAJE_ERROR_CONEXION;
        mostrarMensajeLogin(mensaje);
    } finally {
        elementosLogin.boton.disabled = false;
    }
}

function iniciarLogin() {
    elementosLogin = obtenerElementosLogin();
    cargarUsuarioRecordado();
    elementosLogin.botonMostrarContrasena.addEventListener(
        "click",
        alternarVisibilidadContrasena
    );
    elementosLogin.formulario.addEventListener("submit", manejarEnvioLogin);
}

document.addEventListener("DOMContentLoaded", iniciarLogin);

/*
 * Esta autenticacion demo se eliminara cuando exista una comprobacion real
 * en el backend.
 */

const CREDENCIALES_ADMIN_PRUEBA = Object.freeze({
    usuario: "admin",
    contrasena: "admin"
});

async function autenticarUsuarioDemo(datosLogin) {
    const credencialesValidas = datosLogin.usuario === CREDENCIALES_ADMIN_PRUEBA.usuario
        && datosLogin.contrasena === CREDENCIALES_ADMIN_PRUEBA.contrasena;

    if (!credencialesValidas) {
        throw new Error(MENSAJE_CREDENCIALES_INVALIDAS);
    }

    window.gestionSesionDemo.crear();
    return {
        autenticado: true
    };
}