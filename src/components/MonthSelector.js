export default function MonthSelector({ meses, filtroFecha, filtrarGastos }){
  
  const mesesNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="meses-container">
      {meses.map((mes) => (
        <div
          key={mes}
          className={`mes-item ${filtroFecha === mes ? 'active' : ''}`}
          onClick={() => filtrarGastos(mes)}
        >
          {mesesNames[new Date(mes + '-').getMonth()]}
        </div>
      ))}
    </div>
  );
  };