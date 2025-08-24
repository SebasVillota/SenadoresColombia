const BASE_URL = "http://127.0.0.1:8000"; // Ajusta si tu FastAPI corre en otro puerto

export const fetchSenadores = async () => {
  const res = await fetch(`${BASE_URL}/senadores`);
  if (!res.ok) throw new Error("Error al obtener senadores");
  const data = await res.json();
  return data.senadores;
};

export const fetchSenadorById = async (id) => {
  const res = await fetch(`${BASE_URL}/senadores/${id}`);
  if (!res.ok) throw new Error("Senador no encontrado");
  return res.json();
};

export const searchSenadores = async (keyword) => {
  const res = await fetch(`${BASE_URL}/senadores/buscar/?keyword=${encodeURIComponent(keyword)}`);
  if (!res.ok) throw new Error("Error en búsqueda");
  const data = await res.json();
  return data.senadores;
};
