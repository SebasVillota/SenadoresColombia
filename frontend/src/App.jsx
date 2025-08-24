// src/App.jsx
import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function App() {
  const [senadores, setSenadores] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [keyword, setKeyword] = useState("");

  const fetchSenadores = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/senadores");
      const data = await res.json();
      setSenadores(data.senadores);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEstadisticas = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/senadores/estadisticas/");
      const data = await res.json();
      setEstadisticas(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSenadores();
    fetchEstadisticas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Dashboard de Senadores de Colombia
      </h1>

      {/* Buscador */}
      <div className="mb-6 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Buscar por nombre, partido o departamento"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabla */}
        <div className="md:w-1/2 bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Senadores
          </h2>
          <Table senadores={senadores} keyword={keyword} />
        </div>

        {/* Gráficos */}
        <div className="md:w-1/2 flex flex-col gap-6">
          {estadisticas ? (
            <>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2 text-gray-700">
                  Senadores por Género
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={estadisticas.por_genero}
                    margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="genero" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cantidad" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2 text-gray-700">
                  Senadores por Partido
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={estadisticas.por_partido}
                    margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="partido" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cantidad" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2 text-gray-700">
                  Senadores por Departamento
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={estadisticas.por_departamento}
                    margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="departamento_nacimiento" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cantidad" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <p className="text-center">Cargando estadísticas...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
