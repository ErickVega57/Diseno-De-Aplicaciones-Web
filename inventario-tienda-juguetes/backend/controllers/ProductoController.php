<?php

// Conexion para inyectar en el modelo
require_once(dirname(__DIR__) . "/config/conexion.php");

// Inyectar el modelo
require_once(dirname(__DIR__) . "/models/Producto.php");

// Utilidades
include(dirname(__DIR__) . "/utils/respuestaJson.php");
include(dirname(__DIR__) . "/utils/validaciones.php");

function manejar_listar_todos(){
    global $conn;

    //LLAMAR A MODELO
    $respuesta = listar_todos($conn);
    
    if($respuesta["ok"]){
        return json_respuesta(HttpStatus::OK, [
            "mensaje" => $respuesta["mensaje"],
            "productos" => $respuesta["productos"]
        ]);
    } else {
        return json_respuesta(HttpStatus::SERVER_ERROR, [
                "mensaje" => $respuesta["mensaje"]
        ]);
    }
}

function manejar_registro_producto($producto){
    global $conn;

    $nombre    = trim((string) $producto["nombre"]);
    $imagen    = trim((string) $producto["imagen"]);
    $categoria = trim((string) $producto["categoria"]);
    $precio = $producto["precio"];
    $stock = $producto["stock"];

    // VALIDAR ENTRADAS
    if (!nombre_valido($nombre)) {
        return json_respuesta(HttpStatus::CLIENT_ERROR, [
            "mensaje" => "El nombre del producto no es válido"
        ]);
    }

    if (!categoria_valida($categoria)){
        return json_respuesta(HttpStatus::CLIENT_ERROR, [
            "mensaje" => "La categoría no es válida"
        ]);
    }

    if (!precio_valido($precio)) {
        return json_respuesta(HttpStatus::CLIENT_ERROR, [
            "mensaje" => "El precio debe ser un número válido mayor o igual a 0"
        ]);
    }

    if (!stock_valido($stock)) {
        return json_respuesta(HttpStatus::CLIENT_ERROR, [
            "mensaje" => "El stock debe ser un entero válido mayor o igual a 0"
        ]);
    }

    if(!imagen_valida($imagen)){
        return json_respuesta(HttpStatus::CLIENT_ERROR, [
            "mensaje" => "La imagen no tiene el formato correcto"
        ]);
    }

    if (!$conn) {
        return json_respuesta(HttpStatus::SERVER_ERROR, [
            "mensaje" => "No se pudo establecer conexión con la base de datos"
        ]);
    }

    //LLAMAR AL MODELO
    $respuesta = registrar_producto($conn, $nombre, $precio, $stock, $imagen, $categoria);

    if($respuesta["ok"]){
        return json_respuesta(HttpStatus::OK, [
            "mensaje" => $respuesta["mensaje"],
            "producto" => $respuesta["producto"]
        ]);
    } else {
        return json_respuesta(HttpStatus::SERVER_ERROR, [
                "mensaje" => $respuesta["mensaje"]
        ]);
    }
}


?>