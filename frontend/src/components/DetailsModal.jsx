export default function DetailsModal({ senador, onClose }) {
  if (!senador) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">{senador.nombre}</h2>
        <div className="space-y-2">
          {Object.entries(senador).map(([key, value]) => (
            <p key={key}>
              <span className="font-semibold">{key.replace("_", " ")}:</span> {value ?? "-"}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
