<?php

require_once(__DIR__ . "/variables.php" );

$conn = mysqli_connect($SERVIDOR, $USUARIO,  $CONTRASENA, $BASE_DE_DATOS);

if(!$conn){
    die("ERROR: " . mysqli_connect_error());
}

?>