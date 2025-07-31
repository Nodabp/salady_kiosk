import { useEffect, useState } from "react";
import axios from "axios";

export function Test() {
    const [test, setTest] = useState([]);

    useEffect(() => {
        async function fetchTests() {
            try {
                const res = await axios.post("http://localhost:8080/api/price/details");
                setTest(res.data); // 배열 저장
            } catch (err) {
                console.error(err);
            }
        }
        fetchTests().then(fetchTests).catch(console.error);
        console.log(fetchTests);
    }, []);
    return (
        <section>
                <h1>콘솔 테스트용 페이지</h1>
        </section>
    );
}