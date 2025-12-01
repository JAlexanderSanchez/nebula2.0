# 🚀 Pasos a Seguir - Guía Rápida

## ✅ Paso 1: Verificar que el Backend Funciona

### 1.1 Abre tu backend en el navegador:
```
https://nebula2-0.onrender.com/api/products
```
(Reemplaza con tu URL real de Render)

**Deberías ver:** Un JSON con productos o un array vacío `[]`

### 1.2 Si el array está vacío, necesitas agregar productos:

**Opción A: Desde tu computadora (recomendado)**
```bash
# Abre una terminal en la carpeta backend
cd backend

# Ejecuta el script de seed
npm run seed
```

**Opción B: Desde MongoDB Compass o Atlas**
- Conecta a tu base de datos
- Agrega productos manualmente en la colección `products`

---

## ✅ Paso 2: Configurar Variable de Entorno en Vercel

### 2.1 Ve a Vercel Dashboard
1. Abre: https://vercel.com
2. Inicia sesión
3. Selecciona tu proyecto `nebula2.0`

### 2.2 Agrega la Variable de Entorno
1. Ve a **Settings** (Configuración)
2. Haz clic en **Environment Variables** (Variables de Entorno)
3. Haz clic en **Add New** (Agregar Nueva)
4. Completa:
   - **Name (Nombre):** `REACT_APP_API_URL`
   - **Value (Valor):** `https://nebula2-0.onrender.com`
     - ⚠️ **IMPORTANTE:** Reemplaza `nebula2-0.onrender.com` con tu URL REAL de Render
     - ⚠️ **NO incluyas** `/api` al final
   - **Environment:** Selecciona todas (Production, Preview, Development)
5. Haz clic en **Save** (Guardar)

---

## ✅ Paso 3: Redesplegar el Frontend

### Opción A: Redesplegar desde Vercel (Rápido)
1. En Vercel Dashboard, ve a **Deployments**
2. Encuentra el último deployment
3. Haz clic en los **tres puntos (⋯)** a la derecha
4. Selecciona **Redeploy**
5. Espera 2-5 minutos

### Opción B: Hacer un commit (Automático)
```bash
# Desde la raíz del proyecto
git add .
git commit -m "Configurar conexión frontend-backend"
git push origin main
```
Vercel detectará los cambios y redesplegará automáticamente.

---

## ✅ Paso 4: Verificar que Todo Funciona

### 4.1 Abre tu Frontend
1. Ve a tu URL de Vercel (ej: `https://nebula2-0-xxxxx.vercel.app`)
2. Abre la **Consola del Navegador** (presiona `F12` o clic derecho → Inspeccionar)

### 4.2 Verifica en la Consola
**✅ Si funciona correctamente:**
- No deberías ver errores en rojo
- Deberías ver los productos cargándose
- La página muestra los productos del backend

**❌ Si hay errores:**
- **Error "Failed to fetch" o "Network Error":**
  - Verifica que la variable `REACT_APP_API_URL` esté configurada correctamente
  - Verifica que el backend esté funcionando (abre la URL en el navegador)

- **Error "CORS policy":**
  - El backend ya está configurado, pero verifica que tu dominio de Vercel esté permitido
  - Revisa `backend/src/server.js` si necesitas agregar tu dominio

- **No aparecen productos:**
  - Verifica que MongoDB tenga productos (ejecuta `npm run seed` en el backend)
  - Verifica que la URL del API sea correcta

---

## 🎯 Checklist Final

Marca cada paso cuando lo completes:

- [ ] Backend funciona (abre `/api/products` y ves productos o `[]`)
- [ ] MongoDB tiene productos (si no, ejecuta `npm run seed`)
- [ ] Variable `REACT_APP_API_URL` configurada en Vercel
- [ ] Frontend redesplegado en Vercel
- [ ] Frontend muestra productos del backend
- [ ] No hay errores en la consola del navegador

---

## 🆘 Si Algo No Funciona

### Problema: "Failed to fetch"
**Solución:**
1. Verifica que el backend esté funcionando: abre `https://tu-backend.onrender.com/api/products`
2. Verifica la variable de entorno en Vercel
3. Asegúrate de que la URL NO tenga `/api` al final

### Problema: Array vacío (no hay productos)
**Solución:**
```bash
cd backend
npm run seed
```

### Problema: CORS Error
**Solución:**
1. Verifica que tu dominio de Vercel esté en `backend/src/server.js`
2. El código ya acepta `*.vercel.app`, debería funcionar automáticamente

### Problema: Variable de entorno no se aplica
**Solución:**
1. Asegúrate de redesplegar después de agregar la variable
2. Las variables de entorno solo se aplican en nuevos deployments

---

## 📞 ¿Necesitas Ayuda?

Si después de seguir estos pasos aún tienes problemas:
1. Revisa la consola del navegador (F12) y copia los errores
2. Revisa los logs de Render (Dashboard → Logs)
3. Verifica que todas las URLs sean correctas

