# Guía de Despliegue: GitHub → Vercel (Frontend) + Render (Backend)

## 📋 Tabla de Contenidos

1. [Preparar el proyecto](#1-preparar-el-proyecto)
2. [Subir a GitHub](#2-subir-a-github)
3. [Desplegar Backend en Render](#3-desplegar-backend-en-render)
4. [Desplegar Frontend en Vercel](#4-desplegar-frontend-en-vercel)

---

## 1. Preparar el proyecto

### Paso 1.1: Inicializar Git (si no está inicializado)

```bash
cd C:\Users\HP\Desktop\Nebula2.0
git init
```

### Paso 1.2: Verificar que los archivos .env estén en .gitignore

Ya están configurados los `.gitignore` en `frontend` y `backend`.

---

## 2. Subir a GitHub

### Paso 2.1: Crear repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `nebula2.0` (o el que prefieras)
3. **NO marques** "Initialize with README" (ya tenemos archivos)
4. Haz clic en **"Create repository"**

### Paso 2.2: Preparar y subir archivos

```bash
# Asegúrate de estar en la raíz del proyecto
cd C:\Users\HP\Desktop\Nebula2.0

# Agregar todos los archivos
git add .

# Hacer commit inicial
git commit -m "Initial commit: Nebula 2.0 proyecto completo"

# Agregar el repositorio remoto (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/nebula2.0.git

# Subir a GitHub
git branch -M main
git push -u origin main
```

**Nota:** GitHub te pedirá autenticación. Usa tu token de acceso personal o tu usuario y contraseña.

---

## 3. Desplegar Backend en Render

### Paso 3.1: Crear cuenta en Render

1. Ve a https://render.com
2. Haz clic en **"Get Started for Free"**
3. Regístrate con GitHub (recomendado)

### Paso 3.2: Crear nuevo Web Service

1. En el dashboard, haz clic en **"New +"**
2. Selecciona **"Web Service"**
3. Conecta tu repositorio de GitHub:
   - Selecciona `nebula2.0`
   - Haz clic en **"Connect"**

### Paso 3.3: Configurar el servicio

**Configuración:**
- **Name:** `nebula-backend` (o el que prefieras)
- **Region:** Elige la más cercana (ej: `Oregon (US West)`)
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### Paso 3.4: Configurar Variables de Entorno

En la sección **"Environment Variables"**, agrega:

```
MONGODB_URI = tu_cadena_de_conexion_mongodb_completa
PORT = 5000
NODE_ENV = production
```

**Importante:** Usa tu cadena de conexión completa de MongoDB Atlas.

### Paso 3.5: Desplegar

1. Haz clic en **"Create Web Service"**
2. Espera a que se complete el despliegue (5-10 minutos)
3. Una vez listo, verás una URL como: `https://nebula-backend-xxxx.onrender.com`

### Paso 3.6: Verificar el backend

Abre en tu navegador:
```
https://tu-backend-url.onrender.com/
```

Deberías ver:
```json
{
  "message": "🚀 NEBULA Smoke Culture API",
  "version": "1.0.0",
  "status": "active"
}
```

**✅ Guarda la URL del backend, la necesitarás para el frontend**

---

## 4. Desplegar Frontend en Vercel

### Paso 4.1: Crear cuenta en Vercel

1. Ve a https://vercel.com
2. Haz clic en **"Sign Up"**
3. Conecta con GitHub

### Paso 4.2: Importar proyecto

1. En el dashboard, haz clic en **"Add New"** → **"Project"**
2. Selecciona tu repositorio `nebula2.0`
3. Haz clic en **"Import"**

### Paso 4.3: Configurar el proyecto

**Configuración:**
- **Framework Preset:** `Create React App`
- **Root Directory:** `frontend`
- **Build Command:** `npm run build` (se detecta automáticamente)
- **Output Directory:** `build` (se detecta automáticamente)
- **Install Command:** `npm install`

### Paso 4.4: Configurar Variables de Entorno

En **"Environment Variables"**, agrega:

```
REACT_APP_API_URL = https://tu-backend-url.onrender.com/api
REACT_APP_WHATSAPP_NUMBER = 593999999999
```

**⚠️ IMPORTANTE:** 
- Reemplaza `https://tu-backend-url.onrender.com` con la URL real de tu backend en Render
- Usa `/api` al final porque tus rutas están en `/api/products`

### Paso 4.5: Desplegar

1. Haz clic en **"Deploy"**
2. Espera 2-5 minutos mientras se construye y despliega
3. Una vez listo, verás una URL como: `https://nebula2-0-xxxxx.vercel.app`

### Paso 4.6: Verificar el frontend

Abre la URL de Vercel en tu navegador y deberías ver tu aplicación funcionando.

---

## 📝 Resumen de URLs

Después del despliegue, tendrás:

- **Frontend (Vercel):** `https://tu-frontend.vercel.app`
- **Backend (Render):** `https://tu-backend.onrender.com`
- **API Endpoint:** `https://tu-backend.onrender.com/api/products`

---

## 🔧 Solución de Problemas

### Backend no responde (Render)
- Verifica que las variables de entorno estén correctas
- Revisa los logs en Render Dashboard → Logs
- Asegúrate de que MongoDB Atlas tenga tu IP en la whitelist o use `0.0.0.0/0`

### Frontend no carga productos (Vercel)
- Verifica que `REACT_APP_API_URL` apunte correctamente al backend
- Debe incluir `/api` al final
- Revisa la consola del navegador para errores CORS

### Error de CORS
- El backend ya tiene `cors()` configurado, debería funcionar
- Si persiste, verifica que el backend esté corriendo

### Productos no aparecen
- Verifica que MongoDB tenga productos
- Ejecuta el seed en producción o desde MongoDB Compass

---

## 🔄 Actualizar después de cambios

### Backend:
```bash
git add .
git commit -m "Descripción de cambios"
git push origin main
```
Render detectará los cambios y redesplegará automáticamente.

### Frontend:
```bash
git add .
git commit -m "Descripción de cambios"
git push origin main
```
Vercel detectará los cambios y redesplegará automáticamente.

---

## ✅ Checklist Final

- [ ] Repositorio creado en GitHub
- [ ] Código subido a GitHub
- [ ] Backend desplegado en Render
- [ ] Variables de entorno configuradas en Render
- [ ] Backend responde correctamente
- [ ] Frontend desplegado en Vercel
- [ ] Variables de entorno configuradas en Vercel
- [ ] Frontend carga productos desde el backend
- [ ] Todo funciona correctamente en producción

---

## 📞 Ayuda Adicional

Si tienes problemas:
1. Revisa los logs en Render/Vercel
2. Verifica las variables de entorno
3. Asegúrate de que MongoDB Atlas permita conexiones desde cualquier IP (`0.0.0.0/0`)

