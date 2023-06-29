import { useState, useEffect, useRef } from "react";
import MonthSelector from "./components/MonthSelector";
import MonthBalance from "./components/MonthBalance";
import Income from "./components/Income";
import Bills from "./components/Bills";
import GastosList from "./components/GastosList";
import GastosContext from "./context/costControlContext";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

export default function App() {
  const [gastos, setGastos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [meses, setMeses] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);
  const [ingresosFiltrados, setIngresosFiltrados] = useState([]);
  const gastos2 = [
    { nombre: "Comida", cantidad: 50, fecha: "2023-06-15" },
    { nombre: "Transporte", cantidad: 20, fecha: "2023-06-20" },
    { nombre: "Comida", cantidad: 30, fecha: "2023-06-25" },
    { nombre: "Entretenimiento", cantidad: 15, fecha: "2023-06-27" },
    { nombre: "Comida", cantidad: 40, fecha: "2023-05-30" },
    { nombre: "Comida", cantidad: 40, fecha: "2023-04-30" },
  ];
  const ingresos = [
    { nombre: "Salario", cantidad: 3000, fecha: "2023-06-01", tipo: 'ingreso' },
    { nombre: "Ventas", cantidad: 1500, fecha: "2023-06-10", tipo: 'ingreso' },
    { nombre: "Bonificación", cantidad: 500, fecha: "2023-06-05", tipo: 'ingreso' },
  ];

  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem("gastos"));
    if (datosGuardados) {
      setGastos(datosGuardados);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos2));
  }, [gastos]);

  useEffect(() => {
    const mesesUnicos = [
      ...new Set(gastos.map((gasto) => gasto.fecha.slice(0, 7))),
    ];
    const mesesOrdenados = mesesUnicos.sort().reverse();
    setMeses(mesesOrdenados);
  }, [gastos]);

  const agregarGasto = () => {
    if (nombre.trim() !== "" && cantidad > 0) {
      const nuevoGasto = {
        nombre,
        cantidad,
        fecha: new Date().toISOString().slice(0, 10),
      };
      setGastos([...gastos, nuevoGasto]);
      setNombre("");
      setCantidad("");
    }
    nombreInputRef.current.focus();
  };

  const filtrarGastos = (fecha) => {
    setFiltroFecha(fecha);
  };

  const calcularBalanceMes = () => {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1; // Sumamos 1 ya que los meses en JavaScript son zero-based
    const anioActual = fechaActual.getFullYear();

    let balance = 0;

    const ingresosFiltrados = ingresos.filter((ingreso) => {
      const fechaIngreso = new Date(ingreso.fecha);
      const mesIngreso = fechaIngreso.getMonth() + 1;
      const anioIngreso = fechaIngreso.getFullYear();

      return mesIngreso === mesActual && anioIngreso === anioActual;
    });

    ingresosFiltrados.forEach((ingreso) => {
      balance += ingreso.cantidad;
    });

    gastosFiltrados.forEach((gasto) => {
      balance -= gasto.cantidad;
    });

    return balance;
  };

  const balanceMes = calcularBalanceMes();

  const calcularPromedio = (lista) => {
    if (lista.length === 0) {
      return 0;
    }

    const total = lista.reduce(
      (acumulador, elemento) => acumulador + elemento.cantidad,
      0
    );
    const promedio = total / lista.length;

    return promedio.toFixed(2);
  };

  const nombreInputRef = useRef(null);
  
  useEffect(() => {
    const filtrarGastos = () => {
      const gastosFiltrados = filtroFecha
        ? gastos.filter((gasto) => gasto.fecha.startsWith(filtroFecha))
        : gastos;
      setGastosFiltrados(gastosFiltrados);
    };

    filtrarGastos();
  }, [gastos, filtroFecha]);

  return (
    <div className="App">
      <MonthSelector
        meses={meses}
        filtroFecha={filtroFecha}
        filtrarGastos={filtrarGastos}
      />
      <div className="container">
        <div className="container">
          <div className="row mt-3">
            <div className="col-12 card">
              <MonthBalance balanceMes={balanceMes} />
              <div className="row">
                <div className="col-6 border-end border-gray">
                  <Income
                    ingresos={ingresos}
                    calcularPromedio={calcularPromedio}
                  />
                </div>
                <div className="col-6">
                  <Bills
                  gastos={gastos}
                  ingresos={ingresos}
                  filtroFecha={filtroFecha}
                  // gastosFiltrados={gastosFiltrados}
                    // gastosFiltrados={gastosFiltrados}
                    calcularPromedio={calcularPromedio}
                  />
                </div>
                <p className="analytical">Ver analiticas</p>
              </div>
            </div>
          </div>
        </div>
        <GastosContext.Provider value={gastosFiltrados}>
          <GastosList
          gastosFiltrados={gastosFiltrados}
          ingresosFiltrados={ingresosFiltrados}
          />
        </GastosContext.Provider>
        <div>
          <div className="input-container">
            <input
            className="input"
              type="text"
              placeholder="Nombre del gasto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              ref={nombreInputRef}
            />
            <input
            className="input"
              type="number"
              placeholder="Cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(parseFloat(e.target.value))}
            />
          </div>
          <button className="button" onClick={agregarGasto}>Agregar Gasto</button>
        </div>
      </div>
    </div>
  );
}
