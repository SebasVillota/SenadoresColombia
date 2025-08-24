import React from "react";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, Legend, CartesianGrid
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28FD0", "#FF6666"];

function StatsCharts({ stats }) {
  if (!stats) return <p>Cargando estadísticas...</p>;

  const { por_genero, por_partido, por_departamento } = stats;

  return (
    <div className="space-y-8">
      {/* Género */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Senadores por Género</h3>
        <PieChart width={300} height={200}>
          <Pie
            data={por_genero}
            dataKey="cantidad"
            nameKey="genero"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {por_genero.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Partido */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Senadores por Partido</h3>
        <BarChart width={300} height={200} data={por_partido}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="partido" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad" fill="#00C49F" />
        </BarChart>
      </div>

      {/* Departamento */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Senadores por Departamento (Top 10)</h3>
        <BarChart width={300} height={200} data={por_departamento}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="departamento_nacimiento" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad" fill="#FF8042" />
        </BarChart>
      </div>
    </div>
  );
}

export default StatsCharts;
