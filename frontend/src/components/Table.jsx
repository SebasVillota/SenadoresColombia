// src/components/Table.jsx
import React, { useState } from "react";

export default function Table({ senadores, keyword }) {
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Filtrar según búsqueda
  const filtered = senadores.filter(
    (s) =>
      s.nombre.toLowerCase().includes(keyword.toLowerCase()) ||
      s.partido.toLowerCase().includes(keyword.toLowerCase()) ||
      (s.departamento_nacimiento &&
        s.departamento_nacimiento.toLowerCase().includes(keyword.toLowerCase()))
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Partido</th>
              <th className="p-2 border">Departamento</th>
              <th className="p-2 border">Género</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((senador, index) => (
                <tr key={senador.rowid}>
                  <td className="p-2 border">{start + index + 1}</td>
                  <td className="p-2 border">{senador.nombre}</td>
                  <td className="p-2 border">{senador.partido}</td>
                  <td className="p-2 border">{senador.departamento_nacimiento}</td>
                  <td className="p-2 border">{senador.genero}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => setSelected(senador)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Detalles
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 border text-center" colSpan="6">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded border ${
              p === page ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Modal de detalles completo */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg shadow-lg relative">
            <h2 className="text-2xl font-bold mb-4">{selected.nombre}</h2>
            <div className="space-y-2 text-gray-700">
              {Object.entries(selected).map(([key, value]) => (
                <p key={key}>
                  <strong>{key.replace("_", " ")}:</strong> {value || "-"}
                </p>
              ))}
            </div>
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
