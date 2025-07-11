# 🐾 AdoptMe - Backend API

Este proyecto es el backend de **AdoptMe**, una API RESTful desarrollada con Node.js, Express y MongoDB para la gestión de usuarios, mascotas y adopciones. Documentado con Swagger, probado con Supertest y dockerizado para facilitar su despliegue.

---

## 📦 Características principales

- Autenticación con JWT
- Documentación con Swagger
- Tests funcionales con Supertest, Mocha y Chai
- Dockerfile para contenedorización
- Imagen pública en DockerHub

---

## 🐳 Imagen en DockerHub

🔗 [https://hub.docker.com/r/dario78/adoptme-backend](https://hub.docker.com/r/dario78/adoptme-backend)

---

## 🚀 Cómo ejecutar el proyecto con Docker

### ✅ Prerrequisitos

- Tener [Docker instalado](https://www.docker.com/products/docker-desktop)

### ▶️ Comando para ejecutar el contenedor:

```bash
docker run -p 8080:8080 dario78/adoptme-backend
```

El servidor quedará disponible en `http://localhost:8080`.

---

## 📚 Documentación Swagger

Una vez ejecutado el contenedor, podés acceder a la documentación completa del módulo `Users` en:

👉 `http://localhost:8080/api/docs`

---

## 🧪 Tests funcionales

Los tests funcionales cubren todos los endpoints de `/api/adoptions`, incluyendo casos exitosos y de error.

### Ejecutar los tests:

```bash
npm test
```

> ⚠️ Requiere MongoDB en ejecución y tener configurado el entorno de desarrollo.

---

## 📌 Rutas principales

### 👤 Users

- `GET /api/users/` - Obtener todos los usuarios
- `GET /api/users/:uid` - Obtener un usuario por ID
- `PUT /api/users/:uid` - Actualizar un usuario
- `DELETE /api/users/:uid` - Eliminar un usuario

### 🐶 Adoptions

- `GET /api/adoptions/` - Obtener todas las adopciones
- `GET /api/adoptions/:aid` - Obtener una adopción específica
- `POST /api/adoptions/:uid/:pid` - Crear una adopción

### 🐕 Pets (si está incluido)

- `GET /api/pets/` - Listar mascotas
- `POST /api/pets/` - Crear mascota (según permisos)
- etc.

---

## 🧱 Stack Tecnológico

- Node.js
- Express
- MongoDB (Atlas)
- Mongoose
- JWT
- Supertest + Mocha + Chai
- Swagger
- Docker

---

## 👨‍💻 Autor

**Darío Eliezer Herrera**  
Entrega final - Curso Backend III - Coderhouse  
Julio 2025