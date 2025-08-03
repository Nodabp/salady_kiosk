import {useState} from "react";
import axios from "axios";
export default function PointInputModal({ user, cartItems, onBack, onConfirm }) {
    const [pointInput, setPointInput] = useState("");
    const [error, setError] = useState("");
    const [finalPrice, setFinalPrice] = useState(null);

    const handleApply = async () => {
        const pointValue = Number(pointInput);
        if (pointValue < 3000) {
            setError("포인트는 최소 3,000원부터 사용 가능합니다.");
            return;
        }
        if (pointValue % 1000 !== 0) {
            setError("포인트는 1,000원 단위로만 사용 가능합니다.");
            return;
        }
        if (pointValue > user.availablePoints) {
            setError("보유 포인트를 초과할 수 없습니다.");
            return;
        }
        const priceRes = await axios.post("http://localhost:8080/api/price/details", {
            userId: user.id,
            pointAmount: pointValue,
            items: cartItems.map(item => ({
                menuId: item.menuId,
                quantity: item.quantity,
                options: item.options.map(opt => ({
                    optionId: opt.optionId,
                    quantity: opt.quantity
                }))
            }))
        });

        setFinalPrice(priceRes.data.finalTotalPrice);
        onConfirm(pointValue, priceRes.data.finalTotalPrice);
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" >
            <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-xl text-black">
                <h2 className="text-xl font-bold mb-4 text-center">포인트 사용</h2>
                <p className="mb-2">회원명 : {user.name}</p>
                <p className="mb-2">보유 포인트: {user.availablePoints} P</p>
                <input
                    type="number"
                    min="3000"
                    step="1000"
                    max={user.availablePoints}
                    placeholder="포인트 사용 (1000원 단위)"
                    value={pointInput}
                    onChange={(e) => setPointInput(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-2"
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {[1,2,3,4,5,6,7,8,9,0].map(num => (
                        <button
                            key={num}
                            onClick={() => setPointInput(prev => (prev + num).slice(0, 11))}
                            className="bg-gray-50 rounded p-2 text-xl font-bold hover:bg-green-100"
                        >
                            {num}
                        </button>
                    ))}
                    <button
                        onClick={() => setPointInput(prev => (prev + "000").slice(0, 11))}
                        className="bg-gray-50 rounded p-2 text-xl font-bold hover:bg-green-100"
                    >
                        000
                    </button>

                    <button
                        onClick={() => setPointInput("")}
                        className="bg-gray-50 rounded p-2 text-xl font-bold hover:bg-green-100"
                    >
                        Clear
                    </button>

                </div>
                <div className="flex space-x-2 mt-4">
                    <button onClick={onBack} className="flex-1 py-2 bg-gray-200 rounded">뒤로</button>
                    <button onClick={handleApply} className="flex-1 py-2 bg-green-900 text-white rounded">적용</button>
                </div>
            </div>
        </div>
    );
}