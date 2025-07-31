export default function OrderConfirmModal({cartItems, finalPrice, onConfirm, onCancel, pointUsed, priceDetails}) {
    console.log(priceDetails);
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-xl text-black">
                <h2 className="text-2xl font-bold mb-4 text-center">주문 확인</h2>
                <ul className="divide-y mb-4">
                    {cartItems.map((item, idx) => (
                        <li key={idx} className="py-2">
                            <div className="flex justify-between">
                                <span>{item.name} × {item.quantity}</span>
                                <span>{item.totalPrice.toLocaleString()}원</span>
                            </div>
                            {item.options.length > 0 && (
                                <ul className="pl-4 text-sm text-gray-600">
                                    {item.options.map((opt, optIdx) => (
                                        <li key={optIdx}>
                                            └ {opt.name} × {opt.quantity}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
                <div className="text-right text-lg font-bold mb-4">
                    {pointUsed > 0 && (
                        <div className="text-right text-sm mb-4">-{pointUsed}p</div>
                    )}
                    {priceDetails.map((item, idx) => (
                        <div key={idx} className="mb-2">
                            <p className="font-semibold text-sm">{item.name}</p>
                            <ul className="text-xs text-green-700 ml-2">
                                {item.appliedDiscounts.map((discount, i) => (
                                    <li key={i}>- {discount.note}: {discount.amount}원 할인</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    총 결제 금액: <span className="text-green-700">{finalPrice}원</span>

                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        결제 진행
                    </button>
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}