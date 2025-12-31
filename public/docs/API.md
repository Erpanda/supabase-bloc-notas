# Documentación de la API

El proyecto "Lista de Tareas" utiliza una arquitectura basada en servicios para interactuar con Supabase. Los servicios están ubicados en `src/js/services` y encapsulan la lógica de negocio y las llamadas a la base de datos.

## Estructura de Respuesta Común

Casi todas las funciones de los servicios devuelven un objeto con la siguiente estructura básica:

```javascript
{
    "success": boolean, // true si la operación fue exitosa, false si falló
    "data": any,        // (Opcional) Datos devueltos (usuario, tareas, etc.)
    "error": string     // (Opcional) Mensaje de error si success es false
}
```

## Servicio de Autenticación (`authService.js`)

Maneja el registro, inicio de sesión y gestión de sesiones de usuario.

### `registrarUsuario(nombre, apellido, email, password)`

Registra un nuevo usuario en Supabase Auth y crea su perfil en la tabla `profiles`.

- **Parámetros:**
  - `nombre` (string): Nombre del usuario.
  - `apellido` (string): Apellido del usuario.
  - `email` (string): Correo electrónico.
  - `password` (string): Contraseña.
- **Retorna:**
  - `success`: `true` si se registró correctamente.
  - `user`: Objeto de usuario de Supabase Auth.
  - `profile`: Objeto de perfil creado en la base de datos.
  - `error`: Mensaje de error en caso de fallo.

### `iniciarSesion(email, password)`

Autentica al usuario y recupera su perfil.

- **Parámetros:**
  - `email` (string): Correo electrónico.
  - `password` (string): Contraseña.
- **Retorna:**
  - `success`: `true` si el login fue exitoso.
  - `user`: Objeto de usuario.
  - `profile`: Datos del perfil del usuario.
  - `error`: Mensaje de error en caso de fallo.

### `cerrarSesion()`

Cierra la sesión actual del usuario.

- **Retorna:**
  - `success`: `true` si se cerró la sesión correctamente.
  - `error`: Mensaje de error en caso de fallo.

### `obtenerUsuarioActual()`

Obtiene el usuario autenticado actualmente desde Supabase.

- **Retorna:**
  - `success`: `true` si se obtuvo el usuario.
  - `user`: Datos del usuario actual.
  - `error`: Mensaje de error en caso de fallo.

---

## Servicio de Tareas (`taskService.js`)

Gestiona las operaciones CRUD sobre la tabla `tasks`.

### `obtenerTareas()`

Obtiene todas las tareas del usuario logueado, ordenadas por fecha de creación descendente.

- **Retorna:**
  - `success`: `true` si se obtuvieron las tareas.
  - `tasks`: Array de objetos de tareas.
  - `error`: Mensaje de error en caso de fallo.

### `crearTarea(titulo, descripcion = '', fechaLimite = '')`

Crea una nueva tarea asignada al usuario actual.

- **Parámetros:**
  - `titulo` (string): Título de la tarea.
  - `descripcion` (string, opcional): Descripción detallada.
  - `fechaLimite` (string, opcional): Fecha límite para la tarea.
- **Retorna:**
  - `success`: `true` si la tarea fue creada.
  - `task`: Objeto de la tarea creada.
  - `error`: Mensaje de error en caso de fallo.

### `actualizarTarea(taskId, datos)`

Actualiza los campos de una tarea existente.

- **Parámetros:**
  - `taskId` (string/number): ID de la tarea a actualizar.
  - `datos` (object): Objeto con los campos a actualizar (ej: `{ title: 'Nuevo título' }`).
- **Retorna:**
  - `success`: `true` si la actualización fue exitosa.
  - `task`: La tarea actualizada.
  - `error`: Mensaje de error en caso de fallo.

### `completarTarea(taskId, completado)`

Marca una tarea como completada o pendiente.

- **Parámetros:**
  - `taskId` (string/number): ID de la tarea.
  - `completado` (boolean): `true` para completar, `false` para desmarcar.
- **Retorna:**
  - `success`: `true` si se actualizó el estado.
  - `task`: La tarea actualizada.
  - `error`: Mensaje de error en caso de fallo.

### `eliminarTarea(taskId)`

Elimina una tarea permanentemente.

- **Parámetros:**
  - `taskId` (string/number): ID de la tarea a eliminar.
- **Retorna:**
  - `success`: `true` si se eliminó correctamente.
  - `error`: Mensaje de error en caso de fallo.

### `obtenerTareaPorId(taskId)`

Obtiene los detalles de una tarea específica.

- **Parámetros:**
  - `taskId` (string/number): ID de la tarea.
- **Retorna:**
  - `success`: `true` si se encontró la tarea.
  - `task`: Objeto con los datos de la tarea.
  - `error`: Mensaje de error en caso de fallo.

### `obtenerEstadisticasTareas()`

Calcula estadísticas básicas de las tareas del usuario.

- **Retorna:**
  - `success`: `true` si se calcularon las estadísticas.
  - `estadisticas`: Objeto con:
    - `total`: Número total de tareas.
    - `completadas`: Número de tareas completadas.
    - `pendientes`: Número de tareas pendientes.
  - `error`: Mensaje de error en caso de fallo.

---

## Utilidades (`utils/helpers.js`)

Funciones auxiliares para gestión de sesiones, navegación y UI.

### `guardarSesion(user, profile)`

Guarda la información del usuario y su perfil en `localStorage`.

- **Parámetros:**
  - `user` (object): Objeto con `id` y `email` del usuario.
  - `profile` (object): Objeto con datos del perfil.

### `obtenerSesion()`

Recupera la sesión almacenada.

- **Retorna:**
  - Objeto con:
    - `user`: Objeto de usuario (o `null`).
    - `profile`: Objeto de perfil (o `null`).

### `limpiarSesion()`

Elimina los datos de sesión del `localStorage`.

### `verificarAutenticacion()`

Verifica si existe una sesión activa.

- **Retorna:**
  - `boolean`: `true` si hay usuario autenticado, `false` en caso contrario.

### `protegerRuta()`

Redirige al usuario a `index.html` (login) si no está autenticado.

### `redirigirSiAutenticado()`

Redirige al usuario a `dashboard.html` si ya tiene una sesión activa.

### `mostrarError(mensaje)`

Muestra un mensaje de error temporal en el elemento con ID `errorMessage`.

- **Parámetros:**
  - `mensaje` (string): Texto del error a mostrar.

### `mostrarExito(mensaje)`

Muestra un mensaje de éxito temporal en el elemento con ID `successMessage`.

- **Parámetros:**
  - `mensaje` (string): Texto del mensaje exitoso.

### `formatearFecha(fecha)`

Formatea una fecha a un string legible en español (ej: "29 de diciembre de 2025").

- **Parámetros:**
  - `fecha` (string/Date): Fecha a formatear.
- **Retorna:**
  - `string`: Fecha formateada.
