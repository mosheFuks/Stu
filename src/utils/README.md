# Sistema de Notificaciones Toast

Este archivo documenta el uso del sistema genérico de notificaciones que puede ser usado desde cualquier componente o script de la aplicación.

## 📁 Ubicación

```
src/utils/toastNotifications.ts
```

## 🎯 Tipos de Notificaciones

### 1. **Success** (Éxito - Verde)
Utiliza para confirmaciones de operaciones exitosas.
- **Color**: Verde (#28a745)
- **Duración**: 3 segundos (auto-cierre)

### 2. **Error** (Error - Rojo)
Utiliza para mostrar errores y validaciones fallidas.
- **Color**: Rojo (#dc3545)
- **Duración**: 3 segundos (auto-cierre)

### 3. **Loading** (Esperando - Azul)
Utiliza para operaciones en progreso.
- **Color**: Azul (#17a2b8)
- **Duración**: Sin auto-cierre (manual)

## 📚 Funciones Disponibles

### `showSuccess(mensaje, config?)`
Muestra una notificación de éxito.

```typescript
import { showSuccess } from '@/utils/toastNotifications';

showSuccess('✓ Pedido creado exitosamente');

// Con configuración personalizada
showSuccess('✓ Cambios guardados', {
  autoClose: 5000,
  position: 'bottom-right'
});
```

### `showError(mensaje, config?)`
Muestra una notificación de error.

```typescript
import { showError } from '@/utils/toastNotifications';

showError('✗ No se pudo guardar');

// Con configuración personalizada
showError('✗ Contraseña incorrecta', {
  autoClose: 4000,
  position: 'top-center'
});
```

### `showLoading(mensaje, config?) → toastId`
Muestra una notificación de carga sin auto-cerrar. Retorna un ID para actualizar o cerrar después.

```typescript
import { showLoading, updateToast, closeToast } from '@/utils/toastNotifications';

const toastId = showLoading('Guardando pedido...');

// Después de una operación:
// - Actualizar a éxito
updateToast(toastId, '✓ Pedido guardado', 'success');

// - O actualizar a error
updateToast(toastId, '✗ Error al guardar', 'error');

// - O cerrar manualmente
closeToast(toastId);
```

### `showToast(mensaje, tipo, config?)`
Función genérica para mostrar cualquier tipo de notificación.

```typescript
import { showToast } from '@/utils/toastNotifications';

showToast('✓ Operación completada', 'success');
showToast('✗ Error en la operación', 'error');
showToast('Procesando...', 'loading');
```

### `updateToast(toastId, mensaje, tipo)`
Actualiza un toast existente (útil para cambiar estado de loading a success/error).

```typescript
const toastId = showLoading('Enviando...');

setTimeout(() => {
  updateToast(toastId, '✓ Enviado correctamente', 'success');
}, 2000);
```

### `closeToast(toastId)`
Cierra un toast específico.

```typescript
const toastId = showLoading('Cargando...');
closeToast(toastId); // Cierra este toast
```

### `closeAllToasts()`
Cierra todos los toasts activos.

```typescript
import { closeAllToasts } from '@/utils/toastNotifications';

closeAllToasts();
```

## 🔧 Configuración

Todas las funciones (excepto `closeToast` y `closeAllToasts`) aceptan un parámetro `config` opcional:

```typescript
interface ToastConfig {
  autoClose?: number | false;  // Tiempo en ms (3000 por defecto, false = sin auto-cerrar)
  position?: string;           // Posición en pantalla (top-right por defecto)
}
```

### Posiciones Disponibles
- `'top-right'` (por defecto)
- `'top-left'`
- `'top-center'`
- `'bottom-right'`
- `'bottom-left'`
- `'bottom-center'`

## 💡 Casos de Uso Comunes

### Formulario con validación
```typescript
import { showError, showSuccess } from '@/utils/toastNotifications';

function handleSubmit(datos) {
  if (!datos.cliente) {
    showError('✗ Por favor completa el nombre del cliente');
    return;
  }

  if (datos.productos.length === 0) {
    showError('✗ Debes agregar al menos un producto');
    return;
  }

  showSuccess('✓ Formulario válido');
  // Guardar...
}
```

### Operación asincrónica
```typescript
import { showLoading, updateToast } from '@/utils/toastNotifications';

async function guardarPedido(datos) {
  const toastId = showLoading('Guardando pedido...');

  try {
    const response = await fetch('/api/pedidos', {
      method: 'POST',
      body: JSON.stringify(datos)
    });

    if (response.ok) {
      updateToast(toastId, '✓ Pedido guardado correctamente', 'success');
    } else {
      updateToast(toastId, '✗ Error al guardar el pedido', 'error');
    }
  } catch (error) {
    updateToast(toastId, '✗ Error de conexión', 'error');
  }
}
```

### Eliminación con confirmación
```typescript
import { showLoading, updateToast } from '@/utils/toastNotifications';

function eliminarPedido(id) {
  const toastId = showLoading('Eliminando pedido...');

  setTimeout(() => {
    // Aquí iría la llamada a API
    updateToast(toastId, '✓ Pedido eliminado correctamente', 'success');
  }, 1500);
}
```

## 🎨 Estilos Personalizados

Cada tipo tiene su propio estilo:

| Tipo | Color Fondo | Color Texto | Borde |
|------|------------|------------|-------|
| Success | Verde (#d4edda) | Verde oscuro (#155724) | Verde (#28a745) |
| Error | Rojo (#f8d7da) | Rojo oscuro (#721c24) | Rojo (#dc3545) |
| Loading | Azul (#d1ecf1) | Azul oscuro (#0c5460) | Azul (#17a2b8) |

## 📦 Requisitos

Este sistema requiere que `react-toastify` esté instalado:

```bash
npm install react-toastify
```

Y que el componente `<Notifications />` esté renderizado en tu aplicación principal (generalmente en `App.tsx` o `order_management_app.tsx`).

## ✅ Checklist de Integración

- [x] Archivo `src/utils/toastNotifications.ts` creado
- [x] Componente `<Notifications />` renderizado en la app principal
- [x] React-toastify instalado en el proyecto
- [x] Ejemplos documentados en `TOAST_EXAMPLES.ts`
- [x] Sistema listo para usar en cualquier componente

## 📝 Ejemplos Rápidos

```typescript
// Importar donde necesites usar
import { showSuccess, showError, showLoading, updateToast } from '@/utils/toastNotifications';

// Éxito
showSuccess('✓ Pedido creado');

// Error
showError('✗ Error al procesar');

// Carga → Actualizar
const id = showLoading('Procesando...');
updateToast(id, '✓ Listo', 'success');
```

---

**Nota**: Asegúrate de importar `Notifications` en tu componente principal para que los toasts funcionen correctamente.
