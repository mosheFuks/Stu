import { useState } from "react";
import type { Estado, Pedido, Producto } from "../../structs/structs";
import { Calendar, ChevronDown, ChevronUp, DollarSign, FileText, MapPin, Package, Percent, Plus, Trash2, User, X } from "lucide-react";

export const FormularioPedido = ({ pedido, onGuardar, onCancelar, onEliminar, autenticado }: any) => {
  const [vendedor, setVendedor] = useState(pedido?.vendedor || '');
  const [nombreCliente, setNombreCliente] = useState(pedido?.cliente.nombre || '');
  const [direccion, setDireccion] = useState(pedido?.cliente.direccion || '');
  const [descuento, setDescuento] = useState(pedido?.descuento || 0);
  const [info, setInfo] = useState(pedido?.info || '');
  const [productos, setProductos] = useState<Producto[]>(pedido?.productos || []);
  const [estado, setEstado] = useState<Estado>(pedido?.estado || 'PREPARADO');
  const [errorValidacion, setErrorValidacion] = useState('');
  const [seccionCliente, setSeccionCliente] = useState(true);
  const [seccionProductos, setSeccionProductos] = useState(true);
  const [seccionInfo, setSeccionInfo] = useState(false);

  const agregarProducto = () => {
    setProductos([...productos, { codigo: '', descripcion: '', precio: 0, bultos: 0 }]);
    setSeccionProductos(true);
  };

  const actualizarProducto = (index: number, campo: keyof Producto, valor: any) => {
    const nuevos = [...productos];
    nuevos[index] = { ...nuevos[index], [campo]: valor };
    setProductos(nuevos);
  };

  const eliminarProducto = (index: number) => {
    setProductos(productos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vendedor || !nombreCliente) {
      setErrorValidacion('Por favor completa todos los campos obligatorios (Vendedor, Cliente)');
      setTimeout(() => setErrorValidacion(''), 4000);
      return;
    }

    if (productos.length === 0) {
      setErrorValidacion('Debes agregar al menos un producto');
      setTimeout(() => setErrorValidacion(''), 4000);
      return;
    }

    const pedidoNuevo: Pedido = {
      id: pedido?.id || Date.now().toString(),
      vendedor,
      cliente: { nombre: nombreCliente, direccion },
      descuento,
      info,
      fecha: pedido?.fecha || new Date(),
      productos,
      estado
    };

    onGuardar(pedidoNuevo);
    
    // Limpiar formulario solo si NO estamos editando
    if (!pedido) {
      setVendedor('');
      setNombreCliente('');
      setDireccion('');
      setDescuento(0);
      setInfo('');
      setProductos([]);
      setEstado('PREPARADO');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-32">
      <h2 className="text-xl font-bold mb-4">
        {pedido ? 'Editar Pedido' : 'Nuevo Pedido'}
      </h2>

      {/* Error de validación */}
      {errorValidacion && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
          <X size={20} />
          <span>{errorValidacion}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Datos básicos */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <User size={18} className="text-blue-600" />
            Vendedor *
          </label>
          <select
            value={vendedor}
            onChange={(e) => setVendedor(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
            required
          >
            <option value="">Seleccionar vendedor</option>
            <option value="DAM">DAM</option>
            <option value="ABI">ABI</option>
            <option value="ALE">ALE</option>
            <option value="JOSI">JOSI</option>
            <option value="IONI">IONI</option>
            <option value="OTRO">OTRO</option>
          </select>
        </div>

        {/* Sección Cliente */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setSeccionCliente(!seccionCliente)}
            className="w-full px-4 py-3 flex items-center justify-between bg-green-600 text-white font-semibold"
          >
            <span>Datos del Cliente *</span>
            {seccionCliente ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {seccionCliente && (
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <User size={18} className="text-green-600" />
                  Nombre *
                </label>
                <input
                  type="text"
                  value={nombreCliente}
                  onChange={(e) => setNombreCliente(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  placeholder="Nombre del cliente"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin size={18} className="text-green-600" />
                  Dirección
                </label>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  placeholder="Dirección de entrega (opcional)"
                />
              </div>
            </div>
          )}
        </div>

        {/* Sección Productos */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setSeccionProductos(!seccionProductos)}
            className="w-full px-4 py-3 flex items-center justify-between bg-green-600 text-white font-semibold"
          >
            <span>Productos ({productos.length}) *</span>
            {seccionProductos ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {seccionProductos && (
            <div className="p-4 space-y-3">
              {productos.map((producto, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Package size={16} className="text-blue-600" />
                      Producto {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => eliminarProducto(index)}
                      className="text-red-600 p-1 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
                      <FileText size={14} />
                      Código
                    </label>
                    <input
                      type="text"
                      value={producto.codigo}
                      onChange={(e) => actualizarProducto(index, 'codigo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      placeholder="Código"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
                      <FileText size={14} />
                      Descripción
                    </label>
                    <input
                      type="text"
                      value={producto.descripcion}
                      onChange={(e) => actualizarProducto(index, 'descripcion', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      placeholder="Descripción"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
                        <DollarSign size={14} />
                        Precio
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={producto.precio}
                        onChange={(e) => actualizarProducto(index, 'precio', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        placeholder="Precio"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
                        <Package size={14} />
                        Bultos
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={producto.bultos}
                        onChange={(e) => actualizarProducto(index, 'bultos', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        placeholder="Bultos"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={agregarProducto}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Agregar Producto
              </button>
            </div>
          )}
        </div>

        {/* Sección Información Adicional */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setSeccionInfo(!seccionInfo)}
            className="w-full px-4 py-3 flex items-center justify-between bg-green-600 text-white font-semibold"
          >
            <span>Información Adicional</span>
            {seccionInfo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {seccionInfo && (
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Percent size={18} className="text-orange-600" />
                  Descuento (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={descuento}
                  onChange={(e) => setDescuento(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FileText size={18} className="text-gray-600" />
                  Notas
                </label>
                <textarea
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  rows={3}
                  placeholder="Información adicional del pedido"
                />
              </div>
              {autenticado && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar size={18} className="text-purple-600" />
                    Estado
                  </label>
                  <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value as Estado)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  >
                    <option value="PREPARADO">PREPARADO</option>
                    <option value="ENVIADO">ENVIADO</option>
                  </select>
                </div>
              )}
            </div>
          )}
        </div>
      </form>

      {/* Botones fijos abajo (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-2 lg:relative lg:mt-6 lg:border-t-0 lg:p-0">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-lg"
        >
          {pedido ? 'Actualizar Pedido' : 'Crear Pedido'}
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancelar}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold"
          >
            Cancelar
          </button>
          {onEliminar && (
            <button
              type="button"
              onClick={onEliminar}
              className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold"
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}