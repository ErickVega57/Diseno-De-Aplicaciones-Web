<?php

include(__DIR__ . "/validaciones.php");
require_once(__DIR__  . "/conexion.php");

$usuario = (isset($_REQUEST["usuario"])) && is_string($_REQUEST["usuario"]) ? $_REQUEST["usuario"] : "";
$usuario = (isset($_REQUEST["contrasena"])) && is_string($_REQUEST["contrasena"]) ? $_REQUEST["usuario"] : "";

if($usuario == ""){
    header("location: index.php?estado=1");
    exit();
}
if($contrasena == ""){
    header("location: index.php?estado=2&usuario=" . $usuario);
    exit();
}

$usuario = evitar_sql_injection($conn, $usuario);
$contrasena = evitar_sql_injection($conn, $contrasena);

$sql = "SELECT usuario, contrasena, nombre FROM usuarios WHERE usuario = '" . $usuario . "' AND contrasena ='" . $contrasena . "'";

$resultado = mysqli_query($conn, $sql);

if($resultado > 0){
    $registro = mysqli_fetch_assoc($resultado);

    session_start();
    $_SESSION["valido"] = true;
    $_SESSION["nombre"] = $registro["nombre"];

    header("location : menu.php");
} else {
    header("location : index.php?estado=3");
}

?>