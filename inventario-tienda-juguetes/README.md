# Sistema de Inventario para Juguetería

## Objetivo

Desarrollar una aplicación web para administrar el inventario de una juguetería.

Funciones principales:

- Iniciar sesión
- Consultar productos
- Agregar productos
- Actualizar productos
- Eliminar productos

---

# Estructura del Proyecto

## pages/

Contiene las vistas HTML del sistema.

### login.html

Pantalla de autenticación.

### inventario.html

Pantalla principal donde se administra el inventario.

---

## assets/

Recursos del frontend.

### css/

Archivos de estilos.

#### global.css

Estilos compartidos.

#### login.css

Diseño del formulario de inicio de sesión.

#### inventario.css

Diseño del CRUD de productos.

#### print.css

Diseño aplicado al imprimir la página. **

---

### js/

Lógica del frontend.

#### login.js

Validación e inicio de sesión.

#### crud.js

CRUD de productos:

- Crear
- Consultar
- Actualizar
- Eliminar

#### validaciones.js

Validaciones de formularios.

Ejemplos:

- Nombre requerido
- Precio positivo
- Stock válido

#### storage.js

Manejo de:

- LocalStorage
- Cookies

#### ui.js

Manipulación de interfaz.

Ejemplos:

- Mostrar alertas
- Actualizar contenido dinámicamente

---

### img/

Imágenes del sistema.

Logos, íconos y recursos visuales.

---

### uploads/

Archivos cargados desde el frontend.

---

# backend/

Contiene la lógica de servidor en PHP.

---

## config/

Configuraciones generales.

### conexion.php

Conexión a MySQL.

---

## auth/

Sistema de autenticación.

### login.php

Valida credenciales.

### logout.php

Cierra sesión.

### verificarSesion.php

Protege las páginas privadas.

---

## controllers/

Controladores del sistema.

### ProductoController.php

Gestiona operaciones de productos.

---

## models/

Modelos de acceso a datos.

### Producto.php

Representa los productos.

### Categoria.php

Representa las categorías.

---

## api/

Endpoints para AJAX.

### productos.php

Devuelve y recibe JSON.

Permite al frontend interactuar con PHP usando fetch().

---

# database/

Scripts SQL.

### database.sql

Creación de tablas.


---

# Flujo del Sistema

Usuario

↓

Login

↓

Sesión PHP

↓

Inventario

↓

CRUD Productos

↓

MySQL

---

# Tecnologías

Frontend:

- HTML
- CSS
- JavaScript

Backend:

- PHP

Base de Datos:

- MySQL
