import { FormularioPedido } from "./FormularioPedido";
import { ListaPedidos } from "./ListaPedidos";

export const OrdersList = ({eliminarPedido, filtros, setMostrarFiltros, setPedidoEditando, setVista, vista, pedidos, autenticado, onNuevo, onEditar, onVerDetalle, onCambiarEstado, pedidoEditando, actualizarPedido, agregarPedido}: any) => {
    return (
        <>
        {vista === 'lista' && autenticado ? (
            <ListaPedidos
                pedidos={pedidos}
                onNuevo={onNuevo}
                onEditar={onEditar}
                onVerDetalle={onVerDetalle}
                onCambiarEstado={onCambiarEstado}
                onMostrarFiltros={() => setMostrarFiltros(true)}
                filtros={filtros}
            />
        ) : (
            <FormularioPedido
                pedido={pedidoEditando}
                onGuardar={pedidoEditando ? actualizarPedido : agregarPedido}
                onCancelar={() => { 
                    setPedidoEditando(null); 
                    if (autenticado) {
                    setVista('lista');
                    }
                }}
                onEliminar={pedidoEditando ? () => eliminarPedido(pedidoEditando.id) : undefined}
                autenticado={autenticado}
            />
        )}
        </>
    )
}