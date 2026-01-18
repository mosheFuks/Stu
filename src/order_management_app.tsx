import React, { useState, useEffect } from 'react';
import type { Pedido, Filtros } from './structs/structs';
import { Navbar } from './Components/Navbar';
import { OrdersList } from './Components/OrdersList/OrdersList';
import { ModalPassword } from './Components/Modals/ModalPassword';
import { ModalDetalle } from './Components/Modals/ModalDetalle';
import { FiltrosDrawer } from './Components/FiltrosDrawer';
import { Notifications } from './Components/Notifications/Notifications';
import { showSuccess, showError } from './utils/toastNotifications';


// Componente Principal
export default function HomeDashboard() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [vista, setVista] = useState<'lista' | 'formulario'>('formulario');
  const [pedidoEditando, setPedidoEditando] = useState<Pedido | null>(null);
  const [pedidoDetalle, setPedidoDetalle] = useState<Pedido | null>(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtros, setFiltros] = useState<Filtros>({ vendedor: '', fecha: '' });
  const [autenticado, setAutenticado] = useState(false);  
  const [clicksEnLogo, setClicksEnLogo] = useState(0);
  const [mostrarModalPassword, setMostrarModalPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);

  // Cargar pedidos del localStorage
  useEffect(() => {
    const pedidosGuardados = localStorage.getItem('pedidos');
    if (pedidosGuardados) {
      const parsed = JSON.parse(pedidosGuardados);
      setPedidos(parsed.map((p: any) => ({ ...p, fecha: new Date(p.fecha) })));
    }
  }, []);

  // Guardar pedidos en localStorage
  useEffect(() => {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  }, [pedidos]);

  const mostrarMensaje = (mensaje: string, tipo: 'success' | 'error') => {
    if (tipo === 'success') {
      showSuccess(mensaje);
    } else {
      showError(mensaje);
    }
  };

  const agregarPedido = (pedido: Pedido) => {
    setPedidos([...pedidos, pedido]);
    mostrarMensaje('✓ Pedido creado exitosamente', 'success');
    
    if (autenticado) {
      setVista('lista');
    }
  };

  const actualizarPedido = (pedidoActualizado: Pedido) => {
    setPedidos(pedidos.map(p => p.id === pedidoActualizado.id ? pedidoActualizado : p));
    setPedidoEditando(null);
    mostrarMensaje('✓ Pedido actualizado', 'success');
    if (autenticado) {
      setVista('lista');
    }
  };

  const eliminarPedido = (id: string) => {
    setPedidos(pedidos.filter(p => p.id !== id));
    setPedidoEditando(null);
    mostrarMensaje('✓ Pedido eliminado', 'success');
    if (autenticado) {
      setVista('lista');
    }
  };

  const handleClickLogo = () => {
    const nuevosClicks = clicksEnLogo + 1;
    setClicksEnLogo(nuevosClicks);
    
    if (nuevosClicks >= 5) {
      setMostrarModalPassword(true);
      setClicksEnLogo(0);
    }
  };

  const cerrarSesion = () => {
    setAutenticado(false);
    setVista('formulario');
    mostrarMensaje('✓ Sesión cerrada', 'success');
  };

  const handleSubmitPassword = () => {
    const trimmedPassword = password.trim();
    
    if (trimmedPassword === 'probando123') {
      setAutenticado(true);
      setMostrarModalPassword(false);
      setPassword('');
      setMostrarPassword(false);
      mostrarMensaje('✓ Acceso concedido', 'success');
      setTimeout(() => {
        setVista('lista');
      }, 1000);
    } else {
      mostrarMensaje('✗ Contraseña incorrecta', 'error');
      setPassword('');
    }
  };

  const cambiarEstado = (id: string) => {
    setPedidos(pedidos.map(p => 
      p.id === id 
        ? { ...p, estado: p.estado === 'PREPARADO' ? 'ENVIADO' : 'PREPARADO' }
        : p
    ));
  };

  const pedidosFiltrados = pedidos.filter(p => {
    if (filtros.vendedor && !p.vendedor.toLowerCase().includes(filtros.vendedor.toLowerCase())) {
      return false;
    }
    if (filtros.fecha) {
      const fechaPedido = new Date(p.fecha).toISOString().split('T')[0];
      if (fechaPedido !== filtros.fecha) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Notifications Toast Container */}
      <Notifications />

      {/* Header */}
      <Navbar
        autenticado={autenticado}
        cerrarSesion={cerrarSesion}
        handleClickLogo={handleClickLogo}
        pedidos={pedidosFiltrados}
      />

      {/*Lista de pedidos principal */}
      <OrdersList
        eliminarPedido={eliminarPedido}
        filtros={filtros}
        setMostrarFiltros={setMostrarFiltros}
        setPedidoEditando={setPedidoEditando}
        setVista={setVista}
        vista={vista}
        pedidos={pedidosFiltrados}
        autenticado={autenticado}
        onNuevo={() => setVista('formulario')}
        onEditar={(p) => { setPedidoEditando(p); setVista('formulario'); }}
        onVerDetalle={setPedidoDetalle}
        onCambiarEstado={cambiarEstado}
        pedidoEditando={pedidoEditando}
        actualizarPedido={actualizarPedido}
        agregarPedido={agregarPedido}
      />

      {/* Modal de contraseña */}
      <ModalPassword 
        mostrarModalPassword={mostrarModalPassword}
        setMostrarModalPassword={setMostrarModalPassword}
        password={password}
        setPassword={setPassword}
        mostrarPassword={mostrarPassword}
        setMostrarPassword={setMostrarPassword}
        handleSubmitPassword={handleSubmitPassword}
        setClicksEnLogo={setClicksEnLogo}
      />

      {/* Modal de detalle */}
      {pedidoDetalle && (
        <ModalDetalle
          pedido={pedidoDetalle}
          onCerrar={() => setPedidoDetalle(null)}
        />
      )}

      {/* Drawer de filtros */}
      {mostrarFiltros && (
        <FiltrosDrawer
          filtros={filtros}
          onCambiar={setFiltros}
          onCerrar={() => setMostrarFiltros(false)}
          onLimpiar={() => setFiltros({ vendedor: '', fecha: '' })}
        />
      )}
    </div>
  );
}