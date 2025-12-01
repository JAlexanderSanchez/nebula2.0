# 🔧 Configuración de Variables de Entorno

## 📋 Variables de Entorno Necesarias

### Frontend (Vercel)

En el dashboard de Vercel, ve a tu proyecto → **Settings** → **Environment Variables** y agrega:

#### Variable 1: `REACT_APP_API_URL`
- **Valor:** `https://nebula2-0.onrender.com`
  - ⚠️ **IMPORTANTE:** Reemplaza `nebula2-0.onrender.com` con la URL REAL de tu backend en Render
  - ⚠️ **NO incluyas** `/api` al final, el código lo agrega automáticamente
  - Ejemplo correcto: `https://nebula2-0.onrender.com`
  - ❌ Ejemplo incorrecto: `https://nebula2-0.onrender.com/api`

#### Variable 2 (Opcional): `REACT_APP_WHATSAPP_NUMBER`
- **Valor:** Tu número de WhatsApp (ej: `59360249628`)

### Backend (Render)

En el dashboard de Render, ve a tu servicio → **Environment** y verifica que tengas:

- `MONGODB_URI`: Tu cadena de conexión completa de MongoDB Atlas
- `PORT`: `5000` (o déjalo vacío, Render lo asignará automáticamente)
- `NODE_ENV`: `production`

## ✅ Verificación

### 1. Verificar que el backend funciona:
Abre en tu navegador:
```
https://tu-backend-url.onrender.com/api/products
```

Deberías ver un JSON con tus productos.

### 2. Verificar que el frontend puede conectarse:
1. Abre tu frontend en Vercel
2. Abre la consola del navegador (F12)
3. Deberías ver que los productos se cargan correctamente
4. Si hay errores, verifica:
   - Que la variable `REACT_APP_API_URL` esté configurada correctamente
   - Que el backend esté funcionando
   - Que no haya errores de CORS en la consola

## 🐛 Solución de Problemas

### Error: "Failed to fetch" o "Network Error"
- Verifica que la URL del backend sea correcta
- Verifica que el backend esté funcionando (abre la URL en el navegador)
- Verifica que no haya errores de CORS (revisa la consola del navegador)

### Error: "CORS policy"
- El backend ya está configurado para aceptar requests de Vercel
- Si persiste, verifica que el dominio de Vercel esté en la lista de orígenes permitidos en `backend/src/server.js`

### Los productos no aparecen
- Verifica que MongoDB tenga productos (puedes ejecutar el script de seed)
- Verifica que la URL del API sea correcta
- Revisa la consola del navegador para ver errores específicos

