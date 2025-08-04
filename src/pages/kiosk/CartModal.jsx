export default function CartModal({ cartItems, onClose, onUpdateItem, onRemoveItem, onUpdateOption }) {
    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl">
                <h2 className="text-2xl font-bold text-green-900 mb-4">장바구니</h2>

                {cartItems.length === 0 ? (
                    <div className="text-center text-gray-500 py-6">담긴 메뉴가 없습니다.</div>
                ) : (
                    <ul className="divide-y divide-gray-200 mb-4">
                        {cartItems.map((item, idx) => (
                            <li key={idx} className="py-4">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex-1 pr-4">
                                        <div className="font-semibold text-lg">{item.name}</div>
                                    </div>

                                    {/* 메뉴 수량 */}
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => onUpdateItem(idx, item.quantity - 1)}
                                            className="px-3 py-1 bg-gray-200 rounded text-lg"
                                        >
                                            −
                                        </button>
                                        <span className="w-8 text-center text-lg">{item.quantity}</span>
                                        <button
                                            onClick={() => onUpdateItem(idx, item.quantity + 1)}
                                            className="px-3 py-1 bg-gray-200 rounded text-lg"
                                        >
                                            ＋
                                        </button>
                                    </div>

                                    {/* 가격 */}
                                    <div className="ml-4 text-lg font-bold text-green-900">
                                        {item.totalPrice.toLocaleString()}원
                                    </div>

                                    {/* 삭제 */}
                                    <button
                                        onClick={() => onRemoveItem(idx)}
                                        className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
                                    >
                                        삭제
                                    </button>
                                </div>

                                {/* 옵션별 수량 조절 */}
                                {item.options.length > 0 && (
                                    <ul className="text-sm text-gray-600 mt-2 pl-4">
                                        {item.options.map((opt, optIdx) => (
                                            <li key={optIdx} className="flex justify-between items-center py-1">
                                                <span>{opt.name} (+{opt.extraPrice}원)</span>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => onUpdateOption(idx, optIdx, opt.quantity - 1)}
                                                        className="px-2 py-1 bg-gray-200 rounded"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-6 text-center">{opt.quantity}</span>
                                                    <button
                                                        onClick={() => onUpdateOption(idx, optIdx, opt.quantity + 1)}
                                                        className="px-2 py-1 bg-gray-200 rounded"
                                                    >
                                                        ＋
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                )}

                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-green-700 text-white rounded-lg text-lg font-bold"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}
