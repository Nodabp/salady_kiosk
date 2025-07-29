import { useState } from "react";

export default function OptionModal({ menu, onClose, onAddToCart }) {
    const [selections, setSelections] = useState([]);

    // 수량 업데이트 함수
    const updateQuantity = (optionId, newQuantity) => {
        setSelections((prev) => {
            const without = prev.filter((opt) => opt.optionId !== optionId);
            if (newQuantity > 0) {
                return [...without, { optionId, quantity: newQuantity }];
            } else {
                return without;
            }
        });
    };

    // 현재 수량 가져오기
    const getQuantity = (optionId) => {
        const found = selections.find((opt) => opt.optionId === optionId);
        return found?.quantity ?? 0;
    };

    // 담기 실행
    const handleSubmit = () => {
        const orderData = {
            menuId: menu.id,
            name: menu.name,
            price: menu.price,
            options: selections,
        };
        onAddToCart(orderData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-xl">
                <h2 className="text-xl font-bold mb-4">{menu.name}</h2>
                <p className="text-gray-600 mb-4">{menu.description}</p>

                {Array.isArray(menu.menuOptions) && menu.menuOptions.length > 0 ? (
                    <div className="space-y-4">
                        {menu.menuOptions.map((opt) => (
                            <div key={opt.id} className="flex justify-between items-center">
                                <div>
                                    <div className="font-medium">{opt.name}</div>
                                    <div className="text-sm text-gray-500">
                                        (+{opt.extraPrice.toLocaleString()}원)
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => updateQuantity(opt.id, getQuantity(opt.id) - 1)}
                                        className="px-2 py-1 bg-gray-200 rounded"
                                    >
                                        −
                                    </button>
                                    <span className="w-6 text-center">{getQuantity(opt.id)}</span>
                                    <button
                                        onClick={() => updateQuantity(opt.id, getQuantity(opt.id) + 1)}
                                        className="px-2 py-1 bg-gray-200 rounded"
                                    >
                                        ＋
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-500 mb-4">선택할 옵션이 없습니다.</div>
                )}

                <div className="flex justify-end mt-6 space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                        취소
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">
                        담기
                    </button>
                </div>
            </div>
        </div>
    );
}