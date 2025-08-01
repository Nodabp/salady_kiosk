import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function SuccessPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const baseData = {
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("amount"),
            paymentKey: searchParams.get("paymentKey"),
        };

        async function confirm() {
            try {
                const response = await fetch("http://localhost:8080/api/payment/confirm", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...baseData,
                        orderStatus: "payReceive", // 성공 시 상태
                    }),
                });

                const json = await response.json();

                if (!response.ok) {
                    // 실패 시 상태를 "orderFail"로 보내기
                    await fetch("http://localhost:8080/api/payment/confirm", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            ...baseData,
                            orderStatus: "orderFail",
                        }),
                    });

                    navigate(`/fail?message=${json.message}&code=${json.code}`);
                    return;
                }

                // 결제 성공 비즈니스 로직 (예: navigate("/complete"))
            } catch (error) {
                // 네트워크 오류 등 예외 상황에도 실패 상태 전송
                await fetch("http://localhost:8080/api/payment/confirm", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...baseData,
                        orderStatus: "orderFail",
                    }),
                });

                navigate(`/fail?message=Network Error&code=500`);
            }
        }

        confirm().then(() => { location.href = "/toss/complete";
        }).catch((error) => {console.error(error)});
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