import { useContext } from "react";
import GastosContext from "../context/costControlContext";

export default function GastosList({ gastosFiltrados, ingresosFiltrados }) {
  const gastos = useContext(GastosContext);

  const registros = [...gastosFiltrados, ...ingresosFiltrados];

  registros.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  const obtenerFechaTexto = (fecha) => {
    const fechaGasto = new Date(fecha);
    const opcionesFecha = { day: 'numeric', month: 'long' };
    const fechaTexto = fechaGasto.toLocaleDateString('es-MX', opcionesFecha);
    return fechaTexto;
  };

  let fechaActual = null;

  return (
    <div className="">
      {gastosFiltrados.length > 0 ? (
        <ul className="unorderlist">
          {registros.map((registro, index) => {
            const fechaTexto = obtenerFechaTexto(registro.fecha);
            const mostrarFecha = fechaActual !== fechaTexto;
            fechaActual = fechaTexto;
            return (
              <div key={`registro-${index}`}>
                {mostrarFecha && <li className="fecha">{fechaTexto}</li>}
                <li className="card-list card" key={`registro-${index}`}>
                  <div className="flex-element">
                    <div className="avatar"></div>
                    <span>{registro.nombre}</span>
                  </div>
                  <span className={`number ${registro.tipo === 'ingreso' ? 'ingreso' : 'gasto' }`}>
                    {registro.tipo === 'ingreso' ? '+' : '-'}${registro.cantidad}
                  </span>
                </li>
              </div>
            );
          })}
        </ul>
      ) : (
        <p>No hay gastos para mostrar.</p>
      )}
    </div>
  );
}
