import {
  showToast,
  showSuccess,
  showError,
  showLoading,
  updateToast,
  closeToast,
  closeAllToasts,
  type NotificationType,
} from '@/utils/toastNotifications';

/**
 * EJEMPLOS DE USO DE NOTIFICACIONES TOAST
 * 
 * Esta utilidad proporciona un sistema genérico de notificaciones que puede
 * ser usado desde cualquier componente o script en la aplicación.
 */

// ============================================
// 1. NOTIFICACIONES DE ÉXITO
// ============================================

// Método 1: Usar showSuccess() directamente
showSuccess('✓ Operación completada');

// Método 2: Usar showToast() con tipo 'success'
showToast('✓ Pedido creado exitosamente', 'success');

// Método 3: Con configuración personalizada
showSuccess('✓ Cambios guardados', {
  autoClose: 5000,
  position: 'bottom-right',
});

// ============================================
// 2. NOTIFICACIONES DE ERROR
// ============================================

// Método 1: Usar showError() directamente
showError('✗ Algo salió mal');

// Método 2: Usar showToast() con tipo 'error'
showToast('✗ No se pudo guardar el pedido', 'error');

// Método 3: Con configuración personalizada
showError('✗ Contraseña incorrecta', {
  autoClose: 4000,
  position: 'top-center',
});

// ============================================
// 3. NOTIFICACIONES DE CARGA/ESPERANDO
// ============================================

// Mostrar una notificación de carga sin auto-cerrar
const toastId = showLoading('Guardando pedido...');

// Simular una operación asincrónica
// setTimeout(() => {
//   // Actualizar a éxito
//   updateToast(toastId, '✓ Pedido guardado correctamente', 'success');
// }, 3000);

// O cerrar manualmente
// closeToast(toastId);

// ============================================
// 4. CASOS DE USO COMUNES
// ============================================

// Crear un pedido con indicador de carga
async function crearPedido(datos: any) {
  const toastId = showLoading('Creando pedido...');

  try {
    // Simular llamada a API
    const resultado = await fetch('/api/pedidos', {
      method: 'POST',
      body: JSON.stringify(datos),
    });

    if (resultado.ok) {
      updateToast(toastId, '✓ Pedido creado exitosamente', 'success');
    } else {
      updateToast(toastId, '✗ Error al crear el pedido', 'error');
    }
  } catch (error) {
    updateToast(toastId, '✗ Error de conexión', 'error');
  }
}

// Validar formulario
function validarFormulario(datos: any) {
  if (!datos.cliente) {
    showError('✗ Por favor ingresa el nombre del cliente');
    return false;
  }

  if (!datos.productos || datos.productos.length === 0) {
    showError('✗ Debes agregar al menos un producto');
    return false;
  }

  showSuccess('✓ Formulario válido');
  return true;
}

// Eliminar con confirmación
function eliminarPedido(id: string) {
  showLoading('Eliminando pedido...');

  setTimeout(() => {
    showSuccess('✓ Pedido eliminado correctamente');
  }, 1500);
}

// ============================================
// 5. TIPOS DISPONIBLES
// ============================================

/*
NotificationType puede ser:
  - 'success' → Notificación verde con éxito
  - 'error'   → Notificación roja con error
  - 'loading' → Notificación azul esperando/cargando

Cada tipo tiene su propio estilo:
  - Success: Fondo verde claro, texto verde oscuro, borde verde
  - Error:   Fondo rojo claro, texto rojo oscuro, borde rojo
  - Loading: Fondo azul claro, texto azul oscuro, borde azul
*/

// ============================================
// 6. CONFIGURACIÓN DISPONIBLE
// ============================================

/*
Las notificaciones pueden configurarse con:
  
  autoClose: number | false
    - Tiempo en ms para auto-cerrar (default: 3000)
    - false = no auto-cerrar (útil para loading)
  
  position: 'top-right' | 'top-left' | 'top-center' | 
            'bottom-right' | 'bottom-left' | 'bottom-center'
    - Posición donde aparece el toast (default: 'top-right')

Ejemplo:
  showSuccess('Guardado', { 
    autoClose: 5000,
    position: 'bottom-center'
  });
*/

export {};
