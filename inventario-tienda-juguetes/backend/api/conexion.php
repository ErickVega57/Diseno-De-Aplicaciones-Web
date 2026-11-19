<?php
require_once(__DIR__ . "/variables.php");

$conn = mysqli_connect($servidor, $usuario,  $contrasena, $basededatos);

if(!$conn){
    die("ERROR: " . mysqli_connect_error());
}

?>