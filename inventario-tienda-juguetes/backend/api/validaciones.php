<?php

function usuario_es_valido(){
    session_start();
    if ($_SESSION["valido"] != true){
        header("location : index.php?estado=4");
        exit();
    }
}

function evitar_sql_injection($conn, $cadena){
    return mysqli_real_escape_string($conn, $cadena);
}

function evitar_cross_scripting($cadena){
    return strip_tags($cadena);
}


?>