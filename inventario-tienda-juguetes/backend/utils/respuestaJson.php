<?php

// acceso a datos 

enum HttpStatus: int {
    case OK = 200;
    case REDIRECTION = 300;
    case CLIENT_ERROR = 400;
    case SERVER_ERROR = 500;
}


function json_respuesta(HttpStatus $statusCode, array $data) {
    http_response_code($statusCode->value);
    header('Content-Type: application/json; charset=utf-8');

    $json = json_encode($data, JSON_UNESCAPED_UNICODE);

    return $json !== false ? $json : '{}';
}

?>