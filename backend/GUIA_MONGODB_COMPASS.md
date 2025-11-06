# Guía: Cómo usar MongoDB Compass para modificar productos

## Paso 1: Descargar MongoDB Compass

1. Ve a: **https://www.mongodb.com/try/download/compass**
2. Descarga la versión para Windows
3. Instala el programa

## Paso 2: Obtener tu cadena de conexión

1. Abre el archivo `backend/.env` en tu editor
2. Copia el valor de `MONGODB_URI`
3. Debería verse así:
   ```
   mongodb+srv://usuario:password@cluster.mongodb.net/nebula?retryWrites=true&w=majority
   ```
4. **Importante:** Si tu contraseña tiene caracteres especiales, reemplázalos con su código URL:
   - `@` → `%40`
   - `#` → `%23`
   - `$` → `%24`
   - `%` → `%25`
   - etc.

## Paso 3: Conectarte a MongoDB Atlas

1. Abre **MongoDB Compass**
2. En la pantalla de conexión, pega tu cadena de conexión completa
3. Haz clic en el botón **"Connect"**
4. Espera a que establezca la conexión (verás un indicador verde)

## Paso 4: Navegar a tus productos

1. En el panel izquierdo verás tus bases de datos
2. Busca y haz clic en la base de datos **`nebula`** (o el nombre que hayas usado)
3. Busca la colección **`products`**
4. Haz clic en **`products`**

## Paso 5: Ver y editar productos

### Ver todos los productos:
- Verás una lista con todos los productos
- Cada fila muestra algunos campos principales
- Puedes usar la barra de búsqueda para filtrar productos

### Editar un producto:

1. **Buscar el producto:**
   - Usa la barra de búsqueda en la parte superior
   - Puedes buscar por nombre, slug, precio, etc.
   - Ejemplo: `{"name": "Dozo THC-P"}`

2. **Abrir para editar:**
   - Haz clic en el producto que quieres modificar
   - Se abrirá en una vista detallada

3. **Modificar campos:**
   - Haz clic en el botón **"Edit Document"** (icono de lápiz) en la esquina superior derecha
   - Modifica cualquier campo que necesites:
     - `price`: Cambia el precio (número)
     - `stock`: Cambia el estado ("Disponible", "Agotado", "Proximamente")
     - `badge`: Cambia el badge ("NUEVO", "Últimas unidades", null)
     - `isFeatured`: Marca como destacado (true/false)
     - `imageUrls`: Array de URLs de imágenes
     - `specs`: Objeto con especificaciones técnicas
     - Cualquier otro campo del modelo

4. **Guardar cambios:**
   - Haz clic en el botón **"Update"** (o presiona `Ctrl+S`)
   - Los cambios se guardarán inmediatamente en MongoDB

### Crear un nuevo producto:

1. Haz clic en el botón **"INSERT DOCUMENT"** (parte superior)
2. Comparte el JSON del producto siguiendo la estructura del modelo
3. Haz clic en **"Insert"**

### Eliminar un producto:

1. Abre el producto que quieres eliminar
2. Haz clic en el botón **"Delete Document"** (icono de papelera)
3. Confirma la eliminación

## Ejemplo de edición:

### Cambiar precio de un producto:
```json
{
  "_id": "...",
  "name": "Dozo THC-P Sugar Sauce 5 GR",
  "price": 55.00,  // ← Cambié de 50.00 a 55.00
  "stock": "Disponible",
  ...
}
```

### Marcar como destacado:
```json
{
  "_id": "...",
  "name": "Death Row 7k",
  "isFeatured": true,  // ← Cambié de false a true
  ...
}
```

### Cambiar stock y badge:
```json
{
  "_id": "...",
  "name": "SWF 3tk 40K",
  "stock": "Agotado",  // ← Cambié de "Disponible" a "Agotado"
  "badge": "Últimas unidades",  // ← Agregué badge
  ...
}
```

## Campos disponibles para editar:

- `name` (String, requerido) - Nombre del producto
- `slug` (String, requerido, único) - URL amigable
- `price` (Number, requerido, mínimo 0) - Precio
- `originalPrice` (Number, opcional) - Precio original (para descuentos)
- `description` (String, requerido) - Descripción corta
- `longDescription` (String, requerido) - Descripción larga
- `isFeatured` (Boolean, default: false) - Si es destacado
- `rating` (Number, 0-5) - Calificación
- `reviews` (Number) - Número de reseñas
- `stock` (String, enum) - Estado: "Disponible", "Agotado", "Proximamente"
- `imageUrls` (Array de Strings) - URLs de imágenes
- `availableColors` (Number) - Número de colores disponibles
- `badge` (String, enum) - Badge: "NUEVO", "Últimas unidades", null
- `specs` (Object) - Especificaciones técnicas:
  - `puffs` (String, requerido)
  - `nicotineLevel` (String, requerido)
  - `liquidVolume` (String, requerido)
  - `functions` (String, default: "STANDARD")

## Consejos útiles:

- **Validación:** MongoDB Compass valida automáticamente que los datos coincidan con el schema
- **Búsqueda avanzada:** Puedes usar consultas MongoDB en la barra de búsqueda:
  - `{"price": {"$lt": 20}}` - Productos con precio menor a 20
  - `{"stock": "Disponible"}` - Solo productos disponibles
  - `{"isFeatured": true}` - Solo productos destacados

- **Copiar/Exportar:** Puedes exportar productos a JSON, CSV, etc.
- **Filtros:** Usa los filtros en la parte superior para encontrar productos rápido

## Solución de problemas:

**No puedo conectar:**
- Verifica que tu IP esté en la whitelist de MongoDB Atlas
- Ve a MongoDB Atlas → Network Access → Add IP Address → Add Current IP Address

**No veo la base de datos:**
- Verifica que en la URL de conexión esté el nombre correcto de la base de datos
- Ejemplo: `...mongodb.net/nebula?...` ← aquí debe estar el nombre

**Error al guardar:**
- Verifica que los tipos de datos sean correctos (números para precio, strings para texto, etc.)
- Asegúrate de que los campos requeridos no estén vacíos
- Verifica que los valores de enum sean correctos (stock, badge)

**Obtener la cadena de conexión desde MongoDB Atlas:**
1. Ve a MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
2. Inicia sesión
3. Haz clic en "Connect" en tu cluster
4. Selecciona "Connect your application"
5. Copia la cadena de conexión
6. Reemplaza `<password>` con tu contraseña real

