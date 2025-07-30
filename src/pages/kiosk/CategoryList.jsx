export default function CategoryList({ categories, selectedId, onSelect }) {
    return (
        <div className="flex overflow-x-auto px-4 py-3 space-x-3 bg-green-50 border-b border-green-100 justify-center">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onSelect(cat.id)}
                    className={`px-6 py-3 rounded text-lg font-semibold transition 
                        ${selectedId === cat.id
                        ? "bg-green-900 text-white shadow-md"
                        : "bg-white text-green-900"
                    }`}
                >
                    {cat.name}
                </button>
            ))}
            <div className=""></div>
        </div>
    );
}