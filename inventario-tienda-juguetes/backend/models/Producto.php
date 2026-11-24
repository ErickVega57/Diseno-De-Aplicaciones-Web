<?php

/*
    COLUMNAS DE LA TABLA DE INVENTARIO
    id
    nombre 
    precio 
    stock 
    nombre_imagen 
    categoria 
*/

// acceso a datos 
function registrar_producto($conn, $nombre_producto, $precio, $stock, $nombre_imagen, $categoria){

    $nombre_esc    = evitar_sql_injection($conn, $nombre_producto);
    $precio_num    = (float) $precio;
    $stock_num     = (int) $stock;
    $imagen_esc    = evitar_sql_injection($conn, $nombre_imagen);
    $categoria_esc = evitar_sql_injection($conn, $categoria);


    $sql = "INSERT INTO INVENTARIO (nombre, precio, stock, nombre_imagen, categoria)
        VALUES ('{$nombre_esc}', {$precio_num}, {$stock_num}, '{$imagen_esc}', '{$categoria_esc}')";


    $result = mysqli_query($conn, $sql);

    if ($result && mysqli_affected_rows($conn) > 0) {

        $nuevoId = mysqli_insert_id($conn);

        $producto = [
            "id" => $nuevoId,
            "nombre" => $nombre_producto,
            "precio" => $precio,
            "stock" => $stock,
            "nombre_imagen" => $nombre_imagen,
            "categoria" => $categoria
        ];
        $respuesta = [
            "ok" => true,
            "mensaje" => "Producto registrado corectamente",
            "producto" => $producto
        ];

        return $respuesta;

    } else {
        return [
            "ok" => false,
            "mensaje" => "No se ha podido registrar el producto"
        ];
    }
}

function listar_todos($conn){
    $sql = "SELECT * FROM INVENTARIO ORDER BY id";

    $result = mysqli_query($conn, $sql);
    $productos = [];

    while ($producto = mysqli_fetch_assoc($result)) {
        $producto["id"] = (int)$producto["id"];
        $producto["precio"] = (float)$producto["precio"];
        $producto["stock"] = (int)$producto["stock"];
        
        $productos[] = $producto;
    }

    return [
        "ok" => true,
        "mensaje" => "productos listados correctamente",
        "productos"=> $productos
    ];
}

?>