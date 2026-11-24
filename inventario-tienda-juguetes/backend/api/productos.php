<?php
header("Content-Type: application/json; charset=utf-8");
require_once(dirname(__DIR__) . "/controllers/ProductoController.php");

$tipo_request = $_SERVER["REQUEST_METHOD"];

$datos = json_decode(file_get_contents("php://input"), true);
if (!is_array($datos)) {
    $datos = [];
}

$id        = $datos["id"] ?? $_GET["id"] ?? null;
$nombre    = isset($datos["nombre"]) ? $datos["nombre"] : "";
$precio    = isset($datos["precio"]) ? $datos["precio"] : null;
$stock     = isset($datos["stock"])  ? $datos["stock"]  : null;
$imagen    = isset($datos["nombre_imagen"]) ? $datos["nombre_imagen"] : "";
$categoria = isset($datos["categoria"]) ? $datos["categoria"] : "";


if($tipo_request === "GET"){
    $body = [];
    // Listar todos
} elseif($tipo_request === "POST"){
    $body = [
        "nombre" => $nombre,
        "precio" => $precio,
        "stock" => $stock,
        "imagen" => $imagen,
        "categoria" => $categoria
    ];
    // LLAMAR AL CONTROLLER
    $respuesta = manejar_registro_producto($body);
    echo $respuesta;
} elseif($tipo_request === "PUT"){
    $body = [
        "id" => $id,
        "nombre" => $nombre,
        "precio" => $precio,
        "stock" => $stock,
        "imagen" => $imagen,
        "categoria" => $categoria
    ];
    // Agregar Producto
} elseif($tipo_request === "DELETE"){
    $body = ["id" => $id];
    // Eliminar producto
}

?>