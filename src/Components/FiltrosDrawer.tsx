import { X } from "lucide-react";


export const FiltrosDrawer = ({ filtros, onCambiar, onCerrar, onLimpiar }: any) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end lg:items-center justify-center">
      <div className="bg-white w-full lg:w-96 lg:rounded-lg max-h-[80vh] overflow-y-auto rounded-t-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">Filtros</h3>
          <button onClick={onCerrar} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Vendedor
            </label>
            <input
              type="text"
              value={filtros.vendedor}
              onChange={(e) => onCambiar({ ...filtros, vendedor: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
              placeholder="Buscar por vendedor"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fecha
            </label>
            <input
              type="date"
              value={filtros.fecha}
              onChange={(e) => onCambiar({ ...filtros, fecha: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 space-y-2">
          <button
            onClick={onCerrar}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold"
          >
            Aplicar Filtros
          </button>
          <button
            onClick={() => { onLimpiar(); onCerrar(); }}
            className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>
  );
}