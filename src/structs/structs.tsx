// Tipos
export type Estado = 'PREPARADO' | 'ENVIADO';

export interface Producto {
  codigo: string;
  descripcion: string;
  precio: number;
  bultos: number;
}

export interface Pedido {
  id: string;
  vendedor: string;
  cliente: {
    nombre: string;
    direccion: string;
  };
  descuento: number;
  info: string;
  fecha: Date;
  productos: Producto[];
  estado: Estado;
}

export interface Filtros {
  vendedor: string;
  fecha: string;
}

export const sellers = ['TODOS', 'DAM', 'ABI', 'ALE', 'JOSI', 'IONI', 'OTRO'];