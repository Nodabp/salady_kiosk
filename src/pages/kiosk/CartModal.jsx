

export default function CartModal({ cartItems, onClose ,optionIdToName}) {
    console.log(cartItems)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl">
                <h2 className="text-2xl font-bold text-green-900 mb-4">장바구니</h2>

                {cartItems.length === 0 ? (
                    <div className="text-center text-gray-500 py-6">담긴 메뉴가 없습니다.</div>
                ) : (
                    <ul className="divide-y divide-gray-200 mb-4">
                        {cartItems.map((item, idx) => (
                            <li key={idx} className="py-4">
                                <div className="flex justify-between">
                                    <div>
                                        <div className="font-semibold text-lg">{item.name}</div>
                                        <div className="text-sm text-gray-500">
                                            수량: {item.quantity}개
                                        </div>
                                        {item.options.length > 0 && (
                                            <ul className="text-sm text-gray-600 mt-1">
                                                {item.options.map((opt) => (
                                                    <li key={opt.optionId}>
                                                        └ {opt.optionId} × {opt.quantity}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="text-lg font-bold text-green-900">
                                        {item.totalPrice.toLocaleString()}원
                                    </div>
                                </div>
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
