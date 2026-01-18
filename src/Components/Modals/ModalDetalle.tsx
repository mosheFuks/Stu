import { EyeOff, Printer, X, Eye } from "lucide-react";
import { useState } from "react";
import type { Producto } from "../../structs/structs";

export const ModalDetalle = ({ pedido, onCerrar }: any) => {
  const [mostrarPrecios, setMostrarPrecios] = useState(true);

  const imprimir = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end lg:items-center justify-center">
      <div className="bg-white w-full lg:w-2xl lg:max-w-2xl lg:rounded-lg max-h-[90vh] overflow-y-auto rounded-t-2xl lg:rounded-b-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">Detalle del Pedido</h3>
          <button onClick={onCerrar} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-4">
          {/* Info básica */}
          {mostrarPrecios && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 font-semibold">Vendedor</p>
                  <p className="font-bold">{pedido.vendedor}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Estado</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    pedido.estado === 'PREPARADO' 
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {pedido.estado}
                  </span>
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Cliente</p>
                  <p className="font-bold">{pedido.cliente.nombre}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Fecha</p>
                  <p className="font-bold">{new Date(pedido.fecha).toLocaleDateString('es-AR')}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 font-semibold">Dirección</p>
                  <p className="font-bold">{pedido.cliente.direccion}</p>
                </div>
              </div>
            </div>
          )}

          {/* Info simplificada */}
          {!mostrarPrecios && (
            <div className="space-y-3">
              <div>
                <p className="text-gray-500 font-semibold text-sm">Dirección</p>
                <p className="font-bold">{pedido.cliente.direccion}</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold text-sm">Fecha</p>
                <p className="font-bold">{new Date(pedido.fecha).toLocaleDateString('es-AR')}</p>
              </div>
            </div>
          )}

          {/* Productos */}
          <div>
            <h4 className="font-bold mb-3">Productos</h4>
            <div className="space-y-2">
              {pedido.productos.map((p: Producto, i: number) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{p.codigo}</p>
                      <p className="text-sm text-gray-600">{p.descripcion}</p>
                      {p.bultos > 0 && (
                        <p className="text-xs text-blue-600 font-semibold mt-1">
                          📦 {p.bultos} bulto{p.bultos !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                    {mostrarPrecios && (
                      <p className="font-bold text-green-700">
                        {p.precio > 0 ? `$${p.precio.toFixed(2)}` : ''}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notas */}
          {pedido.info && (
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-700 mb-1">Notas:</p>
              <p className="text-sm text-gray-600">{pedido.info}</p>
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 space-y-2">
          <div className="flex gap-2">
            <button
              onClick={() => setMostrarPrecios(!mostrarPrecios)}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-200"
              title={mostrarPrecios ? 'Ocultar Info' : 'Mostrar Info'}
            >
              {mostrarPrecios ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <button
              onClick={imprimir}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700"
              title="Imprimir"
            >
              <Printer size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}