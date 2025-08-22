import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {confirmPayment, getPhone, sendSms} from "../../config/api.jsx";

export function SuccessPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const baseData = {
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("amount"),
            paymentKey: searchParams.get("paymentKey"),
        };

        async function confirmAndNotify() {
            const { ok, data } = await confirmPayment(baseData, "payReceive");

            if (!ok) {
                await confirmPayment(baseData, "orderFail");
                navigate(`/fail?message=${data.message}&code=${data.code}`);
                return;
            }

            const phoneNumber = await getPhone(baseData.orderId);
            if (phoneNumber && phoneNumber !== "no-phone") {
                await sendSms(phoneNumber, baseData.amount);
            }

            navigate("/toss/complete");
        }

        confirmAndNotify();
    }, []);

    return (
        <></>
    );
}