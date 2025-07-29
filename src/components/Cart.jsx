export default function Cart() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-inner p-4 flex justify-between items-center z-40">
            <span>장바구니: 샐러드 1개</span>
            <button className="bg-green-500 text-white px-4 py-2 rounded">결제하기</button>
        </div>
    );
}