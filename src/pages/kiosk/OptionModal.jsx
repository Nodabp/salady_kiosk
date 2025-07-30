import { useState, useMemo } from "react";

export default function OptionModal({ menu, onClose, onAddToCart }) {
    const [selections, setSelections] = useState([]);
    const [quantity, setQuantity] = useState(1);

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

    const getQuantity = (optionId) => {
        const found = selections.find((opt) => opt.optionId === optionId);
        return found?.quantity ?? 0;
    };

    // 총 가격 계산
    const totalPrice = useMemo(() => {
        const base = menu.price * quantity;
        const optionsTotal = selections.reduce((sum, s) => {
            const opt = menu.menuOptions.find((o) => o.id === s.optionId);
            return sum + (opt?.extraPrice || 0) * s.quantity;
        }, 0);
        return base + optionsTotal;
    }, [menu, quantity, selections]);

    const handleSubmit = () => {
        const orderData = {
            menuId: menu.id,
            name: menu.name,
            basePrice: menu.price,
            quantity,
            options: selections,
            totalPrice,
        };
        onAddToCart(orderData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl">
                <h2 className="text-2xl font-bold text-green-900 mb-2">{menu.name}</h2>
                <p className="text-gray-600 mb-4">{menu.description}</p>
                <img
                    src={menu.imageUrl ?? "/images/placeholder.png"}
                    alt={menu.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />

                {/* 옵션 선택 */}
                {Array.isArray(menu.menuOptions) && menu.menuOptions.length > 0 && (
                    <div className="space-y-4 mb-4">
                        <h3 className="text-lg font-semibold text-green-900">추가 옵션</h3>
                        {menu.menuOptions.map((opt) => (
                            <div key={opt.id} className="flex justify-between items-center border-b pb-2">
                                <div>
                                    <div className="font-medium">{opt.name}</div>
                                    <div className="text-sm text-gray-500">
                                        +{opt.extraPrice.toLocaleString()}원
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => updateQuantity(opt.id, getQuantity(opt.id) - 1)}
                                        className="px-3 py-1 bg-gray-200 rounded text-lg"
                                    >
                                        −
                                    </button>
                                    <span className="w-8 text-center text-lg">{getQuantity(opt.id)}</span>
                                    <button
                                        onClick={() => updateQuantity(opt.id, getQuantity(opt.id) + 1)}
                                        className="px-3 py-1 bg-gray-200 rounded text-lg"
                                    >
                                        ＋
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 메뉴 수량 */}
                <div className="flex justify-between items-center mt-4 mb-4">
                    <span className="text-lg font-semibold text-green-900">수량</span>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="px-3 py-1 bg-gray-200 rounded text-lg"
                        >
                            −
                        </button>
                        <span className="w-8 text-center text-lg">{quantity}</span>
                        <button
                            onClick={() => setQuantity((q) => q + 1)}
                            className="px-3 py-1 bg-gray-200 rounded text-lg"
                        >
                            ＋
                        </button>
                    </div>
                </div>

                {/* 총액 */}
                <div className="text-right text-2xl font-bold text-green-800 mb-6">
                    총 {totalPrice.toLocaleString()}원
                </div>

                {/* 버튼 */}
                <div className="flex justify-between">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-gray-300 rounded-lg text-lg font-semibold w-1/3"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-3 bg-green-700 text-white rounded-lg text-lg font-bold w-2/3"
                    >
                        장바구니 담기
                    </button>
                </div>
            </div>
        </div>
    );
}
