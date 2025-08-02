import {loadTossPayments, ANONYMOUS} from "@tosspayments/tosspayments-sdk";
import {useEffect, useState} from "react";
import axios from "axios";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "wCevUFwIF9ry5jKuT1aoH";

export function CheckoutPage() {

    const [amount, setAmount] = useState({
        currency: "KRW",
    });
    const [ready, setReady] = useState(false);
    const [widgets, setWidgets] = useState(null);
    const [orderId, setOrderId] = useState("");
    const [customerName, setCustomerName] = useState("비회원");
    const [phone, setPhone] = useState(null);


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const orderIdParams = urlParams.get("orderId");
        const amountParams = Number(urlParams.get("amount"));
        const phone = Number(urlParams.get("phone"));
        const customerNameParams = urlParams.get("name");

        setAmount({currency: "KRW", value: amountParams});
        setOrderId(orderIdParams);
        setCustomerName(customerNameParams);
    }, []);


    useEffect(() => {
        async function fetchPaymentWidgets() {
            // ------  결제위젯 초기화 ------
            const tossPayments = await loadTossPayments(clientKey);
            // 회원 결제
            const widgets = tossPayments.widgets({
                customerKey,
            });
            // 비회원 결제
            // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

            setWidgets(widgets);
        }

        fetchPaymentWidgets();
    }, [clientKey, customerKey]);

    useEffect(() => {
        async function renderPaymentWidgets() {
            if (widgets == null) {
                return;
            }
            // ------ 주문의 결제 금액 설정 ------
            await widgets.setAmount(amount);

            await Promise.all([
                // ------  결제 UI 렌더링 ------
                widgets.renderPaymentMethods({
                    selector: "#payment-method",
                    variantKey: "DEFAULT",
                }),
                // ------  이용약관 UI 렌더링 ------
                widgets.renderAgreement({
                    selector: "#agreement",
                    variantKey: "AGREEMENT",
                }),
            ]);

            setReady(true);
        }

        renderPaymentWidgets();
    }, [widgets]);

    useEffect(() => {
        if (widgets == null) {
            return;
        }

        widgets.setAmount(amount);
    }, [widgets, amount]);

    const cancelOrder = async (orderId) => {
        try {
            const response = await axios.post('http://localhost:8080/api/order/cancel', null, {
                params: {orderId}
            });
            console.log('주문 취소 성공:', response.data);
            return response.data;
        } catch (error) {
            console.error('주문 취소 실패:', error);
            throw error;
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
                    className={`w-full rounded-xl py-6 text-2xl font-bold shadow-xl transition
                    ${ready
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                    disabled={!ready}
                    onClick={async () => {
                        try {
                            await widgets.requestPayment({
                                orderId,
                                orderName: "샐러데이 주문",
                                successUrl: window.location.origin + "/toss/success",
                                failUrl: window.location.origin + "/toss/fail",
                                customerEmail: "1@1.com",
                                customerName,
                                customerMobilePhone: phone
                            });
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                >
                    결제하기
                </button>

                {/* 취소 버튼 */}
                <button
                    className="w-full mt-4 rounded-xl py-6 text-2xl font-bold shadow
         bg-black text-white hover:bg-gray-800 transition"
                    onClick={async () => {
                        try {
                            await cancelOrder(orderId);
                            alert("주문이 취소되었습니다.");
                            window.location.href = "/"; // 또는 원하는 페이지로 리디렉션
                        } catch (err) {
                            alert("주문 취소에 실패했습니다.");
                        }
                    }}
                >
                    취소
                </button>

            </div>
        </div>


    );
}