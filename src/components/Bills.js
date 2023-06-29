export default function Bills({ gastos, ingresos, filtroFecha, calcularPromedio }) {
  const gastosFiltrados = filtroFecha
    ? gastos.filter((gasto) => gasto.fecha.startsWith(filtroFecha))
    : gastos;

  const ingresosFiltrados = filtroFecha
    ? ingresos.filter((ingreso) => ingreso.fecha.startsWith(filtroFecha))
    : ingresos;

  const registros = [...gastosFiltrados, ...ingresosFiltrados];

  return (
    <div className="bills-container">
      <h2>Gastos</h2>
      <p>-{calcularPromedio(gastosFiltrados)}</p>
    </div>
  );
}
