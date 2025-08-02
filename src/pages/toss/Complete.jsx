import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Complete() {
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
			<div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
				<h1 className="text-2xl font-bold mb-4">주문 완료</h1>
				<p className="text-lg mb-6">이용해 주셔서 감사합니다.</p>
				<p className="text-sm text-gray-600">
					{countdown}초 후 메인 페이지로 이동합니다.
				</p>
			</div>
		</div>
	);
}