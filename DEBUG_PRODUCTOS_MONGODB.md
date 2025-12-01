# 🔍 Debug: Productos de MongoDB No Se Visualizan

## Problema
Los productos del seed se insertan correctamente en MongoDB, pero el frontend no los muestra.

## ✅ Pasos para Diagnosticar

### Paso 1: Verificar que MongoDB tiene productos

Abre en tu navegador:
```
https://nebula2-0.onrender.com/api/products
```

**Deberías ver:**
```json
{
  "success": true,
  "count": 7,
  "data": [...]
}
```

Si ves `"count": 0` o `"data": []`, entonces MongoDB está vacío. Ejecuta:
```bash
cd backend
npm run seed
```

---

### Paso 2: Verificar Variable de Entorno en Vercel

1. Ve a **Vercel Dashboard** → Tu proyecto → **Settings** → **Environment Variables**
2. Verifica que existe:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://nebula2-0.onrender.com` (tu URL real)
   - ⚠️ **NO debe tener** `/api` al final

3. Si no existe o está mal, agrégalo/corrígelo y **redesplega** el frontend

---

### Paso 3: Revisar Consola del Navegador

1. Abre tu frontend en Vercel
2. Presiona **F12** para abrir las herramientas de desarrollador
3. Ve a la pestaña **Console**
4. Busca estos mensajes:

**✅ Si funciona correctamente, verás:**
```
🔄 Iniciando carga de productos desde el backend...
📍 URL del API: https://nebula2-0.onrender.com
🌐 Haciendo petición a: https://nebula2-0.onrender.com/api/products
📦 Respuesta completa: {...}
✅ Respuesta recibida del backend: {success: true, data: [...]}
✅ 7 productos cargados desde MongoDB
```

**❌ Si hay error, verás:**
```
❌ Error al obtener productos: ...
❌ Status: 404 (o CORS error)
```

---

### Paso 4: Verificar Errores Comunes

#### Error 1: "Failed to fetch" o "Network Error"
**Causa:** La URL del backend es incorrecta o el backend no está funcionando

**Solución:**
1. Verifica que `REACT_APP_API_URL` esté configurada en Vercel
2. Verifica que el backend esté funcionando (abre la URL en el navegador)
3. Redesplega el frontend después de cambiar la variable

#### Error 2: "CORS policy"
**Causa:** El backend no permite requests desde tu dominio de Vercel

**Solución:**
- El backend ya está configurado para aceptar `*.vercel.app`
- Si persiste, verifica `backend/src/server.js` y agrega tu dominio específico

#### Error 3: "No se pudieron cargar los productos"
**Causa:** El backend responde pero sin datos

**Solución:**
1. Verifica que MongoDB tenga productos (ejecuta `npm run seed`)
2. Verifica que la respuesta del backend tenga el formato correcto

#### Error 4: Los productos fallback se muestran
**Causa:** El frontend no puede conectarse al backend, entonces usa los productos hardcodeados

**Solución:**
1. Revisa la consola del navegador para ver el error específico
2. Verifica la variable de entorno `REACT_APP_API_URL`
3. Verifica que el backend esté funcionando

---

## 🧪 Prueba Rápida

### Desde tu computadora (desarrollo local):

1. **Inicia el backend:**
   ```bash
   cd backend
   npm start
   ```

2. **Crea un archivo `.env` en `frontend/`:**
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

3. **Inicia el frontend:**
   ```bash
   cd frontend
   npm start
   ```

4. **Abre:** `http://localhost:3000`
5. **Revisa la consola** (F12) para ver los logs

Si funciona localmente pero no en producción, el problema es la configuración de Vercel.

---

## 📋 Checklist de Verificación

- [ ] MongoDB tiene productos (verifica `/api/products` en el navegador)
- [ ] Variable `REACT_APP_API_URL` configurada en Vercel
- [ ] Frontend redesplegado después de configurar la variable
- [ ] Consola del navegador muestra logs de carga
- [ ] No hay errores en la consola
- [ ] El backend responde correctamente

---

## 🔧 Solución Rápida

Si después de verificar todo aún no funciona:

1. **Elimina y vuelve a crear la variable de entorno en Vercel:**
   - Ve a Settings → Environment Variables
   - Elimina `REACT_APP_API_URL`
   - Agrégalo de nuevo con el valor correcto
   - Redesplega

2. **Verifica la URL exacta:**
   - Abre `https://tu-backend.onrender.com/api/products` en el navegador
   - Copia la URL exacta (sin `/api/products`)
   - Úsala en la variable de entorno

3. **Revisa los logs de Render:**
   - Ve a Render Dashboard → Tu servicio → Logs
   - Busca errores o advertencias

---

## 💡 Información de Debug

Los logs en la consola te dirán exactamente qué está pasando:

- **🔄 Iniciando carga:** El frontend está intentando cargar productos
- **📍 URL del API:** Muestra qué URL está usando
- **🌐 Haciendo petición:** Muestra la URL completa de la petición
- **✅ Respuesta recibida:** Muestra qué datos recibió del backend
- **❌ Error:** Muestra el error específico

Usa esta información para identificar dónde está el problema.

