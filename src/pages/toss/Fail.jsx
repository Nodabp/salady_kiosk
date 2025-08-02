import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

export function FailPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate("/");
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-green-900 flex items-center justify-center">
            {/*<div className="box_section">*/}
            {/*    <h2>*/}
            {/*        결제 실패*/}
            {/*    </h2>*/}
            {/*    <p>{`에러 코드: ${searchParams.get("code")}`}</p>*/}
            {/*    <p>{`실패 사유: ${searchParams.get("message")}`}</p>*/}
            {/*</div>*/}


        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
            <h1 className="text-2xl font-bold mb-4">주문 실패</h1>
            <p className="text-lg mb-6">다시 주문을 시도해 주세요</p>
            <p className="text-sm text-gray-600">
                {countdown}초 후 메인 페이지로 이동합니다.
            </p>
        </div>
    </div>
    );
}