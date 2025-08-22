import axios from "axios";

const prefix = `${import.meta.env.VITE_API_SERVER_HOST}/api/`

export const getMenuList = async ()=> {
    const res = await axios.get(`${prefix}menus/all`);
    return res.data;

}

export const getUserByPhoneNum = async (phone)=> {
    const res = await axios.get(`${prefix}users/lookup?phoneNumber=${phone}`);
    return res.data;
}

export const getAvailablePoint = async (user)=> {
    const res = await axios.get(`${prefix}points/available?userId=${user.id}`);
    return res.data;
}

export const priceVerification = async (priceData)=> {
    const res = await axios.post(`${prefix}price/details`,priceData);
    return res.data;
}

export const order = async (orderData)=> {
    const res = await axios.post(`${prefix}order`,orderData);
    return res.data;
}

export const orderCancel = async (orderId)=> {
    const res = await axios.post(`${prefix}order/cancel`, null, {
        params: {orderId}
    });
    return res.data;
}
export async function getPhone(orderId) {
    try {
        const response = await axios.post(`${prefix}order/phone`, null, {
            params: { orderId },
        });
        return response.data;
    } catch (error) {
        console.log("전화번호 조회 실패", error);
        return null;
    }
}

export async function sendSms(to, amount) {
    if (!to) return;
    try {
        await axios.post(`${prefix}send_sms`, {
            to,
            text: `샐러데이 주문완료 이용해 주셔서 감사합니다! 주문 금액: ${amount}`,
        });
    } catch (error) {
        console.log("SMS 전송 실패", error);
    }
}

export async function confirmPayment(data, status) {
    try {
        const response = await fetch(`${prefix}payment/confirm`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data, orderStatus: status }),
        });
        const json = await response.json();
        return { ok: response.ok, data: json };
    } catch (error) {
        console.log("결제 확인 요청 실패", error);
        return { ok: false, data: { message: "Network Error", code: 500 } };
    }
}