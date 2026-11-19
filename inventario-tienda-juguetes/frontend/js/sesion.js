const CLAVE_COOKIE_SESION_DEMO = "sesionInventarioDemo";
const CLAVE_SESION_DEMO_LOCAL = "sesionInventarioDemoLocal";
const CLAVE_EXPIRACION_SESION_DEMO_LOCAL = "expiracionSesionInventarioDemoLocal";
const DURACION_SESION_DEMO_SEGUNDOS = 8 * 60 * 60;

function generarIdentificadorSesionOpaco() {
    const bytesSesion = new Uint8Array(32);
    window.crypto.getRandomValues(bytesSesion);

    return Array.from(bytesSesion, (byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

function obtenerCookie(nombreCookie) {
    const cookies = document.cookie.split("; ");
    const cookieEncontrada = cookies.find((cookie) => cookie.startsWith(`${nombreCookie}=`));

    return cookieEncontrada === undefined
        ? ""
        : cookieEncontrada.substring(nombreCookie.length + 1);
}

function crearSesionDemo() {
    const identificadorSesion = generarIdentificadorSesionOpaco();
    const indicadorSeguridad = window.location.protocol === "https:"
        ? "; Secure"
        : "";

    document.cookie = [
        `${CLAVE_COOKIE_SESION_DEMO}=${identificadorSesion}`,
        `Max-Age=${DURACION_SESION_DEMO_SEGUNDOS}`,
        "Path=/",
        "SameSite=Lax",
        indicadorSeguridad
    ].join("; ");
    window.sessionStorage.setItem(
        CLAVE_SESION_DEMO_LOCAL,
        identificadorSesion
    );
    window.sessionStorage.setItem(
        CLAVE_EXPIRACION_SESION_DEMO_LOCAL,
        String(Date.now() + DURACION_SESION_DEMO_SEGUNDOS * 1000)
    );
}

function existeSesionDemo() {
    const sesionLocal = window.sessionStorage.getItem(CLAVE_SESION_DEMO_LOCAL);
    const expiracionLocal = Number(
        window.sessionStorage.getItem(CLAVE_EXPIRACION_SESION_DEMO_LOCAL)
    );
    const sesionLocalVigente = sesionLocal !== null
        && sesionLocal.length === 64
        && Number.isFinite(expiracionLocal)
        && expiracionLocal > Date.now();

    return obtenerCookie(CLAVE_COOKIE_SESION_DEMO).length === 64
        || sesionLocalVigente;
}

function destruirSesionDemo() {
    document.cookie = [
        `${CLAVE_COOKIE_SESION_DEMO}=`,
        "Max-Age=0",
        "Path=/",
        "SameSite=Lax"
    ].join("; ");
    window.sessionStorage.removeItem(CLAVE_SESION_DEMO_LOCAL);
    window.sessionStorage.removeItem(CLAVE_EXPIRACION_SESION_DEMO_LOCAL);
}

function configurarCierreSesionDemo() {
    const enlaceCerrarSesion = document.querySelector("#enlaceCerrarSesion");

    if (enlaceCerrarSesion === null) {
        return;
    }

    enlaceCerrarSesion.addEventListener("click", () => {
        destruirSesionDemo();
    });
}

window.gestionSesionDemo = Object.freeze({
    crear: crearSesionDemo,
    existe: existeSesionDemo,
    destruir: destruirSesionDemo
});

document.addEventListener("DOMContentLoaded", configurarCierreSesionDemo);
