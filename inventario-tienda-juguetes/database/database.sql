CREATE DATABASE IF NOT EXISTS tienda_juguetes;
USE tienda_juguetes;

-- Tabla de credenciales de usuarios
CREATE TABLE CREDENCIALES (
    usuario VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

-- Tabla de inventario
CREATE TABLE INVENTARIO (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL CHECK (precio >= 0),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    nombre_imagen VARCHAR(255) NOT NULL,
    categoria ENUM(
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
    ) NOT NULL
);