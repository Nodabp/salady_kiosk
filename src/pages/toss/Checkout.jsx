import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { orderCancel } from "../../config/api.jsx";

const clientKey = import.meta.env.VITE_TOSS_CLIENTKEY;
const customerKey = import.meta.env.VITE_TOSS_CUSTOMERKEY;


export function CheckoutPage() {
    const [amount, setAmount] = useState({ currency: "KRW", value: 0 });
    const [ready, setReady] = useState(false);
    const [widgets, setWidgets] = useState(null);
    const [orderId, setOrderId] = useState("");
    const [customerName, setCustomerName] = useState("비회원");

    // URL 파라미터 처리
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setOrderId(urlParams.get("orderId"));
        setAmount({ currency: "KRW", value: Number(urlParams.get("amount")) });
        setCustomerName(urlParams.get("name") || "비회원");
    }, []);

    // TossPayments 위젯 초기화
    useEffect(() => {
        async function initWidgets() {
            const tossPayments = await loadTossPayments(clientKey);
            const initializedWidgets = tossPayments.widgets({ customerKey });
            setWidgets(initializedWidgets);
        }
        initWidgets();
    }, []);

    // 결제 UI 렌더링
    useEffect(() => {
        if (!widgets) return;

        async function renderWidgets() {
            await widgets.setAmount(amount);
            await Promise.all([
                widgets.renderPaymentMethods({
                    selector: "#payment-method",
                    variantKey: "DEFAULT",
                }),
                widgets.renderAgreement({
                    selector: "#agreement",
                    variantKey: "AGREEMENT",
                }),
            ]);
            setReady(true);
        }

        renderWidgets();
    }, [widgets]);

    // 주문 취소 처리
    const handleCancel = async () => {
        try {
            await orderCancel(orderId);
            alert("주문이 취소되었습니다.");
            window.location.href = "/";
        } catch (err) {
            alert("주문 취소에 실패했습니다.");
            console.error(err);
        }
    };

    // 결제 요청 처리
    const handlePayment = async () => {
        try {
            await widgets.requestPayment({
                orderId,
                orderName: "샐러데이 주문",
                successUrl: `${window.location.origin}/toss/success`,
                failUrl: `${window.location.origin}/toss/fail`,
                customerEmail: "1@1.com",
                customerName,
                customerMobilePhone: "01012345678",
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-6 py-10">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-green-800 text-center mb-8">
                    결제하기
                </h2>

                {/* 결제 UI */}
                <div id="payment-method" className="mb-6"></div>

                {/* 이용약관 UI */}
                <div id="agreement" className="mb-8"></div>

                {/* 결제 버튼 */}
                <button
                    className={`w-full rounded-xl py-6 text-2xl font-bold shadow-xl transition ${
                        ready
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!ready}
                    onClick={handlePayment}
                >
                    결제하기
                </button>

                {/* 취소 버튼 */}
                <button
                    className="w-full mt-4 rounded-xl py-6 text-2xl font-bold shadow bg-black text-white hover:bg-gray-800 transition"
                    onClick={handleCancel}
                >
                    취소
                </button>
            </div>
        </div>
    );
}