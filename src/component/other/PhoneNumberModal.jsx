import { useState } from "react";
import {
    getUserByPhoneNum,
    getAvailablePoint,
    priceVerification,
    order
} from "../../config/api.jsx";
import OrderConfirmModal from "./OrderConfirmModal.jsx";
import PointInputModal from "./PointInputModal.jsx";

export default function PhoneNumberModal({ onClose, cartItems }) {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [isMember, setIsMember] = useState(false);
    const [user, setUser] = useState(null);
    const [pointInput, setPointInput] = useState("");
    const [finalPrice, setFinalPrice] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isPointModalOpen, setIsPointModalOpen] = useState(false);
    const [priceDetails, setPriceDetails] = useState(null);

    const mapOrderItems = () =>
        cartItems.map(item => ({
            menuId: item.menuId,
            quantity: item.quantity,
            options: item.options.map(opt => ({
                optionId: opt.optionId,
                quantity: opt.quantity
            }))
        }));

    const fetchPriceDetails = async (userId = null, pointAmount = 0) => {
        const priceData = {
            userId,
            pointAmount,
            items: mapOrderItems()
        };
        return await priceVerification(priceData);
    };

    const handleLookup = async () => {
        setError("");
        if (!/^\d{10,11}$/.test(phone)) {
            setError("휴대폰 번호를 올바르게 입력하세요.");
            return;
        }

        try {
            const foundUser = await getUserByPhoneNum(phone);
            const availablePoints = Number(await getAvailablePoint(foundUser));
            const priceRes = await fetchPriceDetails(foundUser.id, 0);

            setUser({ ...foundUser, availablePoints });
            setIsMember(true);
            setFinalPrice(priceRes.finalTotalPrice);
            setPriceDetails(priceRes.details);
        } catch {
            setError("회원 정보가 없습니다. 비회원 결제를 이용하세요.");
        }
    };

    const handleGuestCheckout = async () => {
        const priceRes = await fetchPriceDetails(null, 0);
        setFinalPrice(priceRes.finalTotalPrice);
        setIsMember(false);
        setPriceDetails(priceRes.details);
        setIsConfirmOpen(true);
    };

    const handleConfirmPayment = async () => {
        try {
            let name = "비회원";
            let id = null;

            if (isMember && phone) {
                const userRes = await getUserByPhoneNum(phone);
                name = userRes.name;
                id = userRes.id;
            }

            const orderData = {
                userId: isMember ? id : null,
                customerName: name,
                customerMobile: phone || "01000000000",
                customerEmail: "",
                pointAmount: isMember ? Number(pointInput) : 0,
                items: mapOrderItems()
            };

            const { orderId, totalPrice } = await order(orderData);
            window.location.href = `/toss/checkout?orderId=${orderId}&amount=${totalPrice}&name=${encodeURIComponent(name)}&phoneNumber=${phone || "01000000000"}`;
        } catch (err) {
            console.warn("주문 생성에 실패했어요!", err);
        }
    };


    return (
        <>
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                <div className="bg-white w-full max-w-sm rounded-lg p-6 shadow-xl text-black">
                    <h2 className="text-xl font-bold mb-4 text-center">회원 / 비회원 결제</h2>

                    <input
                        type="text"
                        placeholder="휴대폰 번호"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                    />
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                    <div className="grid grid-cols-3 gap-2 mb-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
                            <button
                                key={num}
                                onClick={() => setPhone(prev => (prev + num).slice(0, 11))}
                                className="bg-gray-50 rounded p-2 text-xl font-bold hover:bg-green-100"
                            >
                                {num}
                            </button>
                        ))}
                        <button
                            onClick={() => setPhone("")}
                            className="bg-gray-50 rounded p-2 text-xl font-bold hover:bg-green-100"
                        >
                            Clear
                        </button>
                        <button
                            onClick={() => setPhone(prev => prev.slice(0, -1))}
                            className="bg-gray-200 rounded p-2 text-sm hover:bg-red-200"
                        >
                            ← 삭제
                        </button>
                    </div>

                    {!isMember ? (
                        <div className="flex flex-col space-y-2">
                            <button onClick={handleLookup} className="w-full px-4 py-2 bg-green-800 text-white rounded">
                                결제 (회원)
                            </button>
                            <button onClick={handleGuestCheckout}
                                    className="w-full px-4 py-2 bg-gray-400 text-white rounded">
                                비회원 결제
                            </button>
                            <button onClick={onClose} className="w-full px-4 py-2 bg-gray-200 rounded">
                                취소
                            </button>
                        </div>
                    ) : (
                        <div className="mt-4">
                            <p className="mb-2">사용 가능 포인트: {user.availablePoints} P</p>

                            <div className="flex gap-2 mb-2">
                                <button
                                    onClick={() => setIsPointModalOpen(true)}
                                    className="flex-1 px-4 py-2 bg-green-900 text-white rounded"
                                >
                                    포인트 사용하기
                                </button>

                                <button
                                    onClick={() => setIsConfirmOpen(true)}
                                    className="flex-1 px-4 py-2 bg-green-900 text-white rounded"
                                >
                                    바로 결제하기
                                </button>
                            </div>

                            <button onClick={onClose} className="w-full py-2 bg-gray-200 rounded">
                                취소
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {isConfirmOpen && (
                <OrderConfirmModal
                    priceDetails={priceDetails}
                    pointUsed={isMember ? pointInput : 0}
                    cartItems={cartItems}
                    finalPrice={finalPrice}
                    onConfirm={handleConfirmPayment}
                    onCancel={() => setIsConfirmOpen(false)}
                />
            )}

            {isPointModalOpen && (
                <PointInputModal
                    user={user}
                    cartItems={cartItems}
                    onBack={() => setIsPointModalOpen(false)}
                    onConfirm={(pointUsed, newPrice) => {
                        setPointInput(pointUsed);
                        setFinalPrice(newPrice);
                        setIsPointModalOpen(false);
                        setIsConfirmOpen(true);
                    }}
                />
            )}
        </>
    );
}