/**
 * GUÍA RÁPIDA DE INTEGRACIÓN DE NOTIFICACIONES
 * 
 * Copiar y pegar los imports necesarios en cualquier componente
 */

// ============================================
// PASO 1: Importar las funciones necesarias
// ============================================

import { 
  showSuccess, 
  showError, 
  showLoading, 
  updateToast,
  closeToast 
} from '@/utils/toastNotifications';

// ============================================
// PASO 2: Usar en tus componentes
// ============================================

// Ejemplo 1: En un formulario
export function MiComponente() {
  const handleGuardar = () => {
    // Validación
    if (!datos.valido) {
      showError('✗ Por favor completa todos los campos');
      return;
    }

    // Operación exitosa
    showSuccess('✓ Datos guardados correctamente');
  };

  return (
    <button onClick={handleGuardar}>
      Guardar
    </button>
  );
}

// Ejemplo 2: En una operación asincrónica
export async function guardarPedido(pedido: any) {
  // Mostrar indicador de carga
  const toastId = showLoading('⏳ Guardando pedido...');

  try {
    const response = await fetch('/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    });

    if (response.ok) {
      // Cambiar a éxito
      updateToast(toastId, '✓ Pedido guardado exitosamente', 'success');
      return true;
    } else {
      // Cambiar a error
      updateToast(toastId, '✗ Error al guardar el pedido', 'error');
      return false;
    }
  } catch (error) {
    updateToast(toastId, '✗ Error de conexión', 'error');
    return false;
  }
}

// Ejemplo 3: Con operaciones múltiples
export function procesarMultiplesPedidos(pedidos: any[]) {
  let toastId: React.ReactText;

  // Inicio
  toastId = showLoading(`⏳ Procesando ${pedidos.length} pedidos...`);

  Promise.all(
    pedidos.map(p => fetch('/api/pedidos', { 
      method: 'POST', 
      body: JSON.stringify(p) 
    }))
  )
    .then(() => {
      updateToast(
        toastId, 
        `✓ Se procesaron ${pedidos.length} pedidos correctamente`, 
        'success'
      );
    })
    .catch(() => {
      updateToast(
        toastId, 
        '✗ Error al procesar los pedidos', 
        'error'
      );
    });
}

// Ejemplo 4: En manejo de errores
export function validarFormulario(datos: any) {
  const errores: string[] = [];

  if (!datos.cliente) errores.push('cliente');
  if (!datos.vendedor) errores.push('vendedor');
  if (datos.productos.length === 0) errores.push('productos');

  if (errores.length > 0) {
    showError(`✗ Faltan campos: ${errores.join(', ')}`);
    return false;
  }

  showSuccess('✓ Validación completada');
  return true;
}

// Ejemplo 5: Con diferentes posiciones
export function ejemplosPosiciones() {
  showSuccess('Arriba a la derecha', { position: 'top-right' });
  
  setTimeout(() => {
    showSuccess('Arriba al centro', { position: 'top-center' });
  }, 1000);

  setTimeout(() => {
    showSuccess('Abajo a la izquierda', { position: 'bottom-left' });
  }, 2000);
}

// Ejemplo 6: Con duración personalizada
export function ejemplosDuracion() {
  // Corta (1 segundo)
  showSuccess('✓ Rápido', { autoClose: 1000 });

  // Larga (10 segundos)
  setTimeout(() => {
    showSuccess('✓ Lento', { autoClose: 10000 });
  }, 2000);
}

// ============================================
// RESUMEN DE FUNCIONES
// ============================================

/*
┌─────────────────────────────────────────┐
│ FUNCIONES DISPONIBLES                   │
├─────────────────────────────────────────┤
│ ✓ showSuccess(msg, config?)             │
│   → Notificación verde de éxito         │
│                                         │
│ ✓ showError(msg, config?)               │
│   → Notificación roja de error          │
│                                         │
│ ✓ showLoading(msg, config?) → id        │
│   → Notificación azul sin auto-cerrar   │
│   Retorna ID para actualizar después    │
│                                         │
│ ✓ showToast(msg, tipo, config?)         │
│   → Función genérica                    │
│                                         │
│ ✓ updateToast(id, msg, tipo)            │
│   → Actualiza un toast existente        │
│                                         │
│ ✓ closeToast(id)                        │
│   → Cierra un toast específico          │
│                                         │
│ ✓ closeAllToasts()                      │
│   → Cierra todos los toasts             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ TIPOS DE NOTIFICACIÓN                   │
├─────────────────────────────────────────┤
│ 'success' → Verde ✓                     │
│ 'error'   → Rojo ✗                      │
│ 'loading' → Azul ⏳                     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ POSICIONES                              │
├─────────────────────────────────────────┤
│ 'top-right'     (por defecto)           │
│ 'top-left'                              │
│ 'top-center'                            │
│ 'bottom-right'                          │
│ 'bottom-left'                           │
│ 'bottom-center'                         │
└─────────────────────────────────────────┘
*/

export {};
