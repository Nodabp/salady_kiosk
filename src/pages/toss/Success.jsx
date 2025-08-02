import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export function SuccessPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const baseData = {
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("amount"),
            paymentKey: searchParams.get("paymentKey"),
        };

        async function getPhone() {
            try {
                const response = await axios.post("http://localhost:8080/api/order/phone", null, {
                    params: { orderId: baseData.orderId },
                });
                return response.data;
            } catch (error) {
                console.log("전화번호 조회 실패");
                return null;
            }
        }

        async function sendSms(phoneNumber) {
            if (!phoneNumber) return;
            try {
                await axios.post("http://localhost:8080/api/send_sms", {
                    to: phoneNumber,
                    text: `샐러데이 주문완료 이용해 주셔서 감사합니다! 주문 금액: ${baseData.amount}`,
                });
            } catch (error) {
                console.log("SMS 전송 실패");
            }
        }

        async function confirmAndNotify() {
            try {
                const response = await fetch("http://localhost:8080/api/payment/confirm", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...baseData, orderStatus: "payReceive" }),
                });

                const json = await response.json();

                if (!response.ok) {
                    await fetch("http://localhost:8080/api/payment/confirm", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ...baseData, orderStatus: "orderFail" }),
                    });
                    navigate(`/fail?message=${json.message}&code=${json.code}`);
                    return;
                }

                // 결제 성공 시에만 SMS 전송
                const phoneNumber = await getPhone();
                if (phoneNumber !== undefined && phoneNumber !== null && phoneNumber !== "no-phone") {
                    await sendSms(phoneNumber);
                }
                // SPA 방식으로 페이지 이동
                navigate("/toss/complete");
            } catch (error) {
                await fetch("http://localhost:8080/api/payment/confirm", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...baseData, orderStatus: "orderFail" }),
                });
                navigate(`/fail?message=Network Error&code=500`);
            }
        }

        confirmAndNotify();
    }, []);

    return (
        <div>
            {/*<div className="box_section">*/}
            {/*    <h2>결제 성공</h2>*/}
            {/*    <p>{`주문번호: ${searchParams.get("orderId")}`}</p>*/}
            {/*    <p>{`결제 금액: ${Number(searchParams.get("amount")).toLocaleString()}원`}</p>*/}
            {/*    <p>{`paymentKey: ${searchParams.get("paymentKey")}`}</p>*/}
            {/*</div>*/}
        </div>
    );
}