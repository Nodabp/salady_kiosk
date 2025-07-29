export default function Modal({ isOpen, onClose, children, title }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-80 shadow-lg">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                {children}
                <button onClick={onClose} className="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded">
                    완료
                </button>
            </div>
        </div>
    );
}