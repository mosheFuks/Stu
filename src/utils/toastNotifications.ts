import { toast, ToastOptions } from 'react-toastify';

export type NotificationType = 'success' | 'error' | 'loading';

interface ToastConfig {
  autoClose?: number | false;
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
}

const defaultConfig: ToastConfig = {
  autoClose: 3000,
  position: 'top-right',
};

const toastStyles = {
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
    borderLeft: '4px solid #28a745',
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderLeft: '4px solid #dc3545',
  },
  loading: {
    backgroundColor: '#d1ecf1',
    color: '#0c5460',
    borderLeft: '4px solid #17a2b8',
  },
};

/**
 * Muestra una notificación toast genérica
 * @param mensaje - Texto del mensaje a mostrar
 * @param tipo - Tipo de notificación: 'success', 'error' o 'loading'
 * @param config - Configuración opcional del toast
 */
export const showToast = (
  mensaje: string,
  tipo: NotificationType = 'success',
  config?: ToastConfig
) => {
  const finalConfig: ToastConfig = { ...defaultConfig, ...config };
  
  // Para notificaciones de carga, no auto-cerrar
  if (tipo === 'loading') {
    finalConfig.autoClose = false;
  }

  const toastOptions: ToastOptions = {
    position: (finalConfig.position as any) || 'top-right',
    autoClose: finalConfig.autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
    className: 'toast-custom',
    bodyClassName: 'toast-body-custom',
    style: toastStyles[tipo],
  };

  if (tipo === 'success') {
    toast.success(mensaje, toastOptions);
  } else if (tipo === 'error') {
    toast.error(mensaje, toastOptions);
  } else if (tipo === 'loading') {
    toast.loading(mensaje, toastOptions);
  }
};

/**
 * Muestra una notificación de éxito
 */
export const showSuccess = (mensaje: string, config?: ToastConfig) => {
  showToast(mensaje, 'success', config);
};

/**
 * Muestra una notificación de error
 */
export const showError = (mensaje: string, config?: ToastConfig) => {
  showToast(mensaje, 'error', config);
};

/**
 * Muestra una notificación de carga/esperando
 * @returns ID del toast para poder actualizarlo o cerrarlo después
 */
export const showLoading = (mensaje: string, config?: ToastConfig): React.ReactText => {
  const finalConfig: ToastConfig = { ...defaultConfig, ...config };
  finalConfig.autoClose = false;

  const toastOptions: ToastOptions = {
    position: (finalConfig.position as any) || 'top-right',
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    theme: 'light',
    className: 'toast-custom',
    bodyClassName: 'toast-body-custom',
    style: toastStyles.loading,
  };

  return toast.loading(mensaje, toastOptions);
};

/**
 * Actualiza un toast existente
 */
export const updateToast = (
  toastId: React.ReactText,
  mensaje: string,
  tipo: NotificationType = 'success'
) => {
  const toastOptions: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
    isLoading: false,
    style: toastStyles[tipo],
  };

  toast.update(toastId, {
    render: mensaje,
    type: tipo === 'loading' ? 'default' : tipo,
    isLoading: false,
    ...toastOptions,
  });
};

/**
 * Cierra un toast específico
 */
export const closeToast = (toastId: React.ReactText) => {
  toast.dismiss(toastId);
};

/**
 * Cierra todos los toasts
 */
export const closeAllToasts = () => {
  toast.dismiss();
};
