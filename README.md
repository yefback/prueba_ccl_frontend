# Prueba Técnica CCL - Frontend

Este proyecto es la solución de la interfaz de usuario para la prueba técnica, construido con **Angular 19**. Implementa un flujo de login seguro y una pantalla de inventario reactiva.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión recomendada 18+ o 20+).
- Angular CLI instalado globalmente (`npm install -g @angular/cli`).

## Ejecución del Proyecto

1. Abre tu terminal en esta carpeta.
2. Instala las dependencias del proyecto de Node.js:
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo de Angular:
   ```bash
   npm start
   ```
   *El frontend iniciará en http://localhost:4200 y se recargará automáticamente si haces cambios en el código.*

## Notas Importantes

- Asegúrate de que el servidor Backend (.NET Core) esté corriendo simultáneamente en el puerto `5200` para que el Frontend pueda consumir sus Endpoints.
- Las credenciales por defecto para iniciar sesión:
  - **Usuario:** admin
  - **Contraseña:** admin123
