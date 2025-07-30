import { useMemo } from "react";

export default function CartPanel({ cartItems, onOpenModal, onCheckout }) {
    const totalCount = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
        [cartItems]
    );
    const totalPrice = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.totalPrice, 0),
        [cartItems]
    );

    return (
        <div className="fixed bottom-0 left-0 w-full bg-green-900 text-white flex justify-between items-center px-6 py-4 shadow-lg">
            <button
                onClick={onOpenModal}
                className="text-left"
            >
                <div className="text-lg font-semibold">{totalCount}개 담김</div>
                <div className="text-xl font-bold">총 {totalPrice.toLocaleString()}원</div>
            </button>
            <button
                onClick={onCheckout}
                className="bg-white text-green-900 px-6 py-3 rounded-full text-lg font-bold shadow hover:bg-green-100 transition"
                disabled={totalCount === 0}
            >
                주문하기
            </button>
        </div>
    );
}
