export default function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="my-4">
      <input
        type="text"
        placeholder="Buscar por nombre, partido o departamento..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
