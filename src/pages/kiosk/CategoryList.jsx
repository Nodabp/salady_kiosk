export default function CategoryList({ categories, selectedId, onSelect }) {
    return (
        <div className="flex overflow-x-auto px-4 py-2 space-x-2">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onSelect(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border ${
                        selectedId === cat.id
                            ? "bg-green-900 text-white border-blue-600"
                            : "bg-white text-gray-800 border-gray-300"
                    }`}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
}