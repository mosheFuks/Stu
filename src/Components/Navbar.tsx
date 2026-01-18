import { LogOut, Menu, Printer } from "lucide-react"

export const Navbar = ({ autenticado, cerrarSesion, handleClickLogo, pedidos }: any) => {
    const imprimirTodos = () => {
      // Crear un contenido HTML para imprimir
      const contenidoImpresion = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Lista de Pedidos</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              background: white;
            }
            .pedido {
              page-break-inside: avoid;
              margin-bottom: 30px;
              border-bottom: 2px solid #ccc;
              padding-bottom: 20px;
            }
            .header {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 15px;
            }
            .header-item {
              font-size: 14px;
            }
            .header-label {
              font-weight: bold;
              color: #666;
            }
            .header-value {
              font-size: 16px;
              font-weight: bold;
              margin-top: 3px;
            }
            .productos {
              margin-top: 15px;
            }
            .productos-title {
              font-weight: bold;
              font-size: 14px;
              margin-bottom: 10px;
            }
            .producto-item {
              background: #f5f5f5;
              padding: 8px;
              margin-bottom: 8px;
              border-radius: 4px;
              font-size: 13px;
            }
            .producto-codigo {
              font-weight: bold;
            }
            .producto-descripcion {
              color: #666;
              margin-top: 2px;
            }
            .producto-bultos {
              color: #0066cc;
              font-size: 12px;
              margin-top: 2px;
            }
            @media print {
              body { margin: 10px; }
              .pedido { margin-bottom: 20px; page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          ${pedidos.map((p: any) => `
            <div class="pedido">
              <div class="header">
                <div class="header-item">
                  <div class="header-label">Dirección</div>
                  <div class="header-value">${p.cliente.direccion}</div>
                </div>
                <div class="header-item">
                  <div class="header-label">Fecha</div>
                  <div class="header-value">${new Date(p.fecha).toLocaleDateString('es-AR')}</div>
                </div>
              </div>
              <div class="productos">
                <div class="productos-title">Productos</div>
                ${p.productos.map((pr: any) => `
                  <div class="producto-item">
                    <div class="producto-codigo">${pr.codigo}</div>
                    <div class="producto-descripcion">${pr.descripcion}</div>
                    ${pr.bultos > 0 ? `<div class="producto-bultos">📦 ${pr.bultos} bulto${pr.bultos !== 1 ? 's' : ''}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </body>
        </html>
      `;

      // Abrir ventana de impresión
      const ventana = window.open('', '', 'width=800,height=600');
      if (ventana) {
        ventana.document.write(contenidoImpresion);
        ventana.document.close();
        ventana.print();
      }
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 
            className="text-2xl font-bold cursor-pointer select-none"
            onClick={handleClickLogo}
          >
            Stocky
          </h1>
          <div className="flex items-center gap-3">
            {autenticado && (
              <>
                <button 
                  onClick={imprimirTodos}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors"
                  title="Imprimir todos los pedidos"
                >
                  <Printer size={18} />
                  <span className="hidden sm:inline">Imprimir Todos</span>
                </button>
                <button 
                  onClick={cerrarSesion}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-red-700 transition-colors"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Cerrar Sesión</span>
                </button>
              </>
            )}
            <button className="lg:hidden p-2 rounded-full bg-blue-600 text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

    )
}