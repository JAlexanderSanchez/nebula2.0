# 📘 GUÍA PASO A PASO COMPLETA: Despliegue Nebula 2.0

## ✅ PASO 1: Verificar que todo está en GitHub

Tu proyecto ya está en: `https://github.com/JAlexanderSanchez/nebula2.0`

---

## 🚀 PARTE 1: DESPLEGAR BACKEND EN RENDER

### PASO 1.1: Crear cuenta en Render

1. Ve a: **https://render.com**
2. Haz clic en **"Get Started for Free"** o **"Sign Up"**
3. Elige **"Sign up with GitHub"** (recomendado)
4. Autoriza a Render a acceder a tu cuenta de GitHub

### PASO 1.2: Crear nuevo Web Service

1. En el Dashboard de Render, haz clic en el botón **"New +"** (arriba a la derecha)
2. Selecciona **"Web Service"** de la lista

### PASO 1.3: Conectar repositorio de GitHub

1. Verás una lista de tus repositorios de GitHub
2. Busca y selecciona: **`nebula2.0`** (o `JAlexanderSanchez/nebula2.0`)
3. Haz clic en **"Connect"**

### PASO 1.4: Configurar el servicio

En la pantalla de configuración, completa estos campos:

- **Name:** `nebula-backend` (o el nombre que prefieras)
- **Region:** Elige la más cercana (recomendado: `Oregon (US West)` o `Frankfurt (EU Central)`)
- **Branch:** `main` (debe estar seleccionado automáticamente)
- **Runtime:** `Node` (debe estar seleccionado automáticamente)

#### ⚙️ Configuración avanzada (haz clic en "Advanced"):

- **Root Directory:** `backend` ⚠️ IMPORTANTE
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### PASO 1.5: Configurar Variables de Entorno

En la sección **"Environment Variables"**, haz clic en **"Add Environment Variable"** y agrega estas variables:

**Variable 1:**
- **Key:** `MONGODB_URI`
- **Value:** Tu cadena de conexión completa de MongoDB Atlas
  - Ejemplo: `mongodb+srv://usuario:password@cluster.mongodb.net/nebula?retryWrites=true&w=majority`
  - ⚠️ Reemplaza `usuario` y `password` con tus credenciales reales

**Variable 2:**
- **Key:** `PORT`
- **Value:** `5000`

**Variable 3:**
- **Key:** `NODE_ENV`
- **Value:** `production`

### PASO 1.6: Crear y desplegar

1. Haz clic en el botón **"Create Web Service"** (abajo)
2. Render comenzará a construir y desplegar tu aplicación
3. Verás un log en tiempo real del proceso
4. ⏱️ Espera 5-10 minutos mientras se completa el despliegue

### PASO 1.7: Verificar que el backend funciona

1. Una vez completado, verás una URL como: `https://nebula-backend-xxxx.onrender.com`
2. Haz clic en la URL o ábrela en una nueva pestaña
3. Deberías ver algo como:

```json
{
  "message": "🚀 NEBULA Smoke Culture API",
  "version": "1.0.0",
  "status": "active"
}
```

### PASO 1.8: Probar la API

Abre esta URL en tu navegador:
```
https://tu-backend-url.onrender.com/api/products
```

Deberías ver un JSON con tus productos.

**✅ ¡GUARDA LA URL DEL BACKEND!** La necesitarás para el frontend.

---

## 🎨 PARTE 2: DESPLEGAR FRONTEND EN VERCEL

### PASO 2.1: Crear cuenta en Vercel

1. Ve a: **https://vercel.com**
2. Haz clic en **"Sign Up"**
3. Elige **"Continue with GitHub"**
4. Autoriza a Vercel a acceder a tu cuenta de GitHub

### PASO 2.2: Importar proyecto

1. En el Dashboard de Vercel, haz clic en **"Add New..."** o **"New Project"**
2. Verás una lista de tus repositorios de GitHub
3. Busca y selecciona: **`nebula2.0`**
4. Haz clic en **"Import"**

### PASO 2.3: Configurar el proyecto

En la pantalla de configuración:

**Framework Preset:**
- Debe detectar automáticamente: **"Create React App"**
- Si no lo detecta, selecciónalo manualmente

**Root Directory:**
- Haz clic en **"Edit"** junto a Root Directory
- Cambia a: `frontend` ⚠️ IMPORTANTE
- Haz clic en **"Continue"**

**Build and Output Settings:**
- **Build Command:** `npm run build` (debe estar automático)
- **Output Directory:** `build` (debe estar automático)
- **Install Command:** `npm install` (debe estar automático)

### PASO 2.4: Configurar Variables de Entorno

Antes de hacer deploy, haz clic en **"Environment Variables"** o busca la sección de variables.

Agrega estas variables haciendo clic en **"Add"**:

**Variable 1:**
- **Name:** `REACT_APP_API_URL`
- **Value:** `https://tu-backend-url.onrender.com/api`
  - ⚠️ **IMPORTANTE:** Reemplaza `tu-backend-url.onrender.com` con la URL REAL de tu backend de Render
  - ⚠️ **IMPORTANTE:** Debe terminar en `/api` porque tus rutas están en `/api/products`

**Variable 2:**
- **Name:** `REACT_APP_WHATSAPP_NUMBER`
- **Value:** `593999999999` (o tu número de WhatsApp)

### PASO 2.5: Desplegar

1. Una vez configuradas las variables de entorno, haz clic en **"Deploy"**
2. Vercel comenzará a construir tu aplicación
3. Verás un log en tiempo real del proceso
4. ⏱️ Espera 2-5 minutos mientras se completa el despliegue

### PASO 2.6: Verificar que el frontend funciona

1. Una vez completado, verás una URL como: `https://nebula2-0-xxxxx.vercel.app`
2. Haz clic en la URL o ábrela en una nueva pestaña
3. Deberías ver tu aplicación funcionando
4. Los productos deberían cargarse desde tu backend

---

## 🔍 VERIFICACIÓN FINAL

### ✅ Checklist de verificación:

- [ ] Backend desplegado en Render y responde correctamente
- [ ] URL del backend guardada
- [ ] Frontend desplegado en Vercel
- [ ] Variables de entorno configuradas en Vercel con la URL correcta del backend
- [ ] Frontend carga y muestra productos
- [ ] No hay errores en la consola del navegador

### 🔗 URLs importantes:

- **Repositorio GitHub:** `https://github.com/JAlexanderSanchez/nebula2.0`
- **Backend Render:** `https://tu-backend-url.onrender.com`
- **API Products:** `https://tu-backend-url.onrender.com/api/products`
- **Frontend Vercel:** `https://tu-frontend-url.vercel.app`

---

## 🐛 SOLUCIÓN DE PROBLEMAS COMUNES

### Problema 1: Backend no responde en Render

**Solución:**
1. Ve a tu servicio en Render Dashboard
2. Haz clic en **"Logs"** para ver errores
3. Verifica que `MONGODB_URI` esté correcta
4. Verifica que MongoDB Atlas permita conexiones desde cualquier IP (`0.0.0.0/0`)

### Problema 2: Frontend no carga productos

**Solución:**
1. Verifica que `REACT_APP_API_URL` termine en `/api`
2. Verifica que la URL del backend sea correcta
3. Abre la consola del navegador (F12) y revisa errores
4. Verifica que el backend esté funcionando

### Problema 3: Error de CORS

**Solución:**
- Tu backend ya tiene `cors()` configurado, debería funcionar
- Si persiste, verifica que el backend esté corriendo

### Problema 4: MongoDB no conecta

**Solución:**
1. Ve a MongoDB Atlas → Network Access
2. Haz clic en **"Add IP Address"**
3. Selecciona **"Allow Access from Anywhere"** (`0.0.0.0/0`)
4. O agrega las IPs de Render específicamente

---

## 🔄 ACTUALIZAR DESPUÉS DE CAMBIOS

### Para actualizar el backend:

```powershell
cd C:\Users\HP\Desktop\Nebula2.0
git add .
git commit -m "Descripción de cambios"
git push origin main
```

Render detectará los cambios automáticamente y redesplegará.

### Para actualizar el frontend:

```powershell
cd C:\Users\HP\Desktop\Nebula2.0
git add .
git commit -m "Descripción de cambios"
git push origin main
```

Vercel detectará los cambios automáticamente y redesplegará.

---

## 📝 NOTAS IMPORTANTES

1. **Render Free Tier:** El servicio puede "dormir" después de 15 minutos de inactividad. La primera petición puede tardar unos segundos en despertar.

2. **Variables de Entorno:** No las subas a GitHub (ya están en `.gitignore`)

3. **MongoDB Atlas:** Asegúrate de que tu base de datos tenga productos. Puedes usar MongoDB Compass o ejecutar el seed script.

4. **URLs:** Guarda todas las URLs importantes en un lugar seguro.

---

## ✅ ¡LISTO!

Una vez completados todos los pasos, tu aplicación estará completamente desplegada y funcionando en producción.

**¿Necesitas ayuda con algún paso específico?** Dime en qué paso estás y te ayudo con cualquier problema.

