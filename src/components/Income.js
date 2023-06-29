export default function Income({ ingresos, calcularPromedio }) {
  return (
    <div className="income-container">
      <h2>Ingresos</h2>
      <p>+{calcularPromedio(ingresos)}</p>
    </div>
  );
}
