import React from "react";
import { useCarrito } from "../../provider/CarritoProvider";


export default function Carrito() {
  const { carrito, vaciarCarrito } = useCarrito();

  const total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);

  const descargarFactura = () => {
    const factura = `
      Factura AR-STOK
      --------------------------
      ${carrito.map(item => `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`).join('\n')}
      --------------------------
      Total: $${total}
    `;
    const blob = new Blob([factura], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "factura.txt";
    link.click();
    vaciarCarrito();
  };

  return (
    <div>
      <h2>Carrito</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul>
            {carrito.map(item => (
              <li key={item.id}>
                {item.nombre} x{item.cantidad} - ${item.precio * item.cantidad}
              </li>
            ))}
          </ul>
          <strong>Total: ${total}</strong>
          <br />
          <button onClick={descargarFactura}>Finalizar compra y descargar factura</button>
        </>
      )}
    </div>
  );
}