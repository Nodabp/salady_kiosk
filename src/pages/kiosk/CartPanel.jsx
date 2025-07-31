// CartPanel.jsx
import { useMemo, useState } from "react";
import PhoneNumberModal from "./PhoneNumberModal.jsx";

export default function CartPanel({ cartItems, onOpenModal }) {
    const [showPhoneModal, setShowPhoneModal] = useState(false);

    const totalCount = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
        [cartItems]
    );
    const totalPrice = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.totalPrice, 0),
        [cartItems]
    );

    return (
        <div className="fixed bottom-0 left-0 w-full bg-green-900 text-white flex justify-between items-center px-6 py-4 shadow-lg z-50">
            {/* 장바구니 상세 열기 */}
            <button
                onClick={onOpenModal}
                className="text-left"
            >
                <div className="text-lg font-semibold">{totalCount}개 담김</div>
                <div className="text-xl font-bold">총 {totalPrice.toLocaleString()}원</div>
            </button>

            {/* 주문 완료 버튼 */}

            { totalCount > 0 &&
            <button
                onClick={() => setShowPhoneModal(true)}
                className="bg-white text-green-900 px-6 py-3 rounded-full text-lg font-bold shadow hover:bg-green-100 transition"
            >
                주문 완료
            </button>
            }
            {/* 회원/비회원 결제 모달 */}
            {showPhoneModal && (
                <PhoneNumberModal
                    cartItems={cartItems}
                    onClose={() => setShowPhoneModal(false)}
                />
            )}
        </div>
    );
}
