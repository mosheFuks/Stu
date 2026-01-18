export const PedidoCard = ({ pedido, onVer, onEditar, onCambiarEstado }: any) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={onVer}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">📍 {pedido.cliente.direccion}</p>
            <p className="text-sm font-semibold">👤 {pedido.vendedor}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            pedido.estado === 'PREPARADO' 
              ? 'bg-orange-100 text-orange-700'
              : 'bg-blue-100 text-blue-700'
          }`}>
            {pedido.estado}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">
          📅 {new Date(pedido.fecha).toLocaleDateString('es-AR')}
        </p>

        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onEditar}
            className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded text-sm font-semibold hover:bg-gray-200"
          >
            Editar
          </button>
          <button
            onClick={onCambiarEstado}
            className={`flex-1 py-2 px-3 rounded text-sm font-semibold ${
              pedido.estado === 'PREPARADO'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-orange-600 text-white hover:bg-orange-700'
            }`}
          >
            {pedido.estado === 'PREPARADO' ? '→ Enviado' : '← Preparado'}
          </button>
        </div>
      </div>
    </div>
  );
}