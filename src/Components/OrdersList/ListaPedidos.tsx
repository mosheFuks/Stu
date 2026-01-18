import { useState } from "react";
import { sellers, type Pedido } from "../../structs/structs";
import { Eraser, Plus } from "lucide-react";
import { PedidoCard } from "./PedidoCard";


export function ListaPedidos({ 
  pedidos, 
  onNuevo, 
  onEditar, 
  onVerDetalle, 
  onCambiarEstado,
  onMostrarFiltros,
  filtros
}: any) {
  const [filtroEstado, setFiltroEstado] = useState<'TODOS' | 'PREPARADO' | 'ENVIADO'>('TODOS');
  const [filtroVendedor, setFiltroVendedor] = useState<string>('TODOS');

  const pedidosFiltrados = pedidos.filter((p: Pedido) => {
    // Filtro por estado
    if (filtroEstado !== 'TODOS' && p.estado !== filtroEstado) return false;
    
    // Filtro por vendedor
    if (filtroVendedor !== 'TODOS' && p.vendedor !== filtroVendedor) return false;
    
    return true;
  });

  const filterButton = (text: string, validator: string) => {
    return (
       <button
          onClick={() => setFiltroEstado(validator as any)}
          className={`px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${
            filtroEstado === validator as any
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {text}
        </button>
    );
  };

  const sellerFilterButton = (text: string, validator: string) => {
    return (
      <button
        onClick={() => setFiltroVendedor(validator)}
        className={`px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${
          filtroVendedor === validator
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        {text}
      </button>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
      {/* Botón Nuevo Pedido */}
      <div className="mb-6">
        <button
          onClick={onNuevo}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Nuevo Pedido
        </button>
      </div>

      {/* Filtros tipo pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {filterButton('TODAS', 'TODOS')}
        {filterButton('PREPARADOS', 'PREPARADO')}
        {filterButton('ENVIADOS', 'ENVIADO')}
        
        {/* Separador visual */}
        <div className="w-px bg-gray-300 mx-1"></div>
        
        {/* Filtros de vendedor */}
        {/* Mapeo de botones para cada vendedor */}
        {sellers.map((vendedor) => sellerFilterButton(vendedor, vendedor))}
        
        {/* Separador visual */}
        <div className="w-px bg-gray-300 mx-1"></div>
        
        {/* Botón limpiar filtros */}
        <button
          onClick={() => {
            setFiltroEstado('TODOS');
            setFiltroVendedor('TODOS');
          }}
          className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
        >
          <Eraser size={16} />
          LIMPIAR
        </button>
      </div>

      {/* Lista de pedidos */}
      <h2 className="text-xl font-bold mb-4">Lista de Pedidos</h2>
      
      {pedidosFiltrados.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center text-gray-500">
          No hay pedidos en esta categoría
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pedidosFiltrados.map((pedido: Pedido) => (
            <PedidoCard
              key={pedido.id}
              pedido={pedido}
              onVer={() => onVerDetalle(pedido)}
              onEditar={() => onEditar(pedido)}
              onCambiarEstado={() => onCambiarEstado(pedido.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}