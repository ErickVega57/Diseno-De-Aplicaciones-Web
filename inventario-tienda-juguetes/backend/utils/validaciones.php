<?php

function usuario_es_valido(array $session): bool {
    return isset($session["valido"]) && $session["valido"] === true;
}

function evitar_sql_injection($conn, $cadena){
    return mysqli_real_escape_string($conn, $cadena);
}

function evitar_cross_scripting($cadena){
    return strip_tags($cadena);
}

function tiene_respuesta($result){
    return mysqli_num_rows($result) > 0;
}

function string_es_int($entrada){
    return filter_var($entrada, FILTER_VALIDATE_INT);
}

function string_es_float($entrada){
    return filter_var($entrada, FILTER_VALIDATE_FLOAT);
}

function nombre_valido($nombre){
    return !($nombre === "");
}

function categoria_valida($categoria){
    if($categoria === ""){
        return false;
    }

    $categorias = [
    'Construccion',
    'Figuras de accion',
    'Juegos de mesa',
    'Juguetes educativos',
    'Manualidades',
    'Muñecas',
    'Peluches',
    'Primera infancia',
    'Vehiculos',
    'Juguetes de aire libre'
    ];
    
    return in_array($categoria, $categorias, true);
}

function stock_valido($stock){
    return string_es_int($stock) && (int) $stock >= 0;
}

function precio_valido($precio){
    return string_es_float($precio) && (float) $precio >= 0;
}

function imagen_valida($imagen){
    if (!is_string($imagen)) {
        return false;
    }

    $sufijos = [
        '.png',
        '.jpeg',
        '.jpg'
    ];

    foreach ($sufijos as $sufijo) {
        if (str_ends_with($imagen, $sufijo)) {
            return true;
        }
    }

    return false;
}

function id_valido($id){
    return string_es_int($id) && (int) $id > 0;
}


?>