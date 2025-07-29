import { useEffect, useState } from "react";
import axios from "axios";

export function Test() {
    const [menuList, setMenuList] = useState([]);

    useEffect(() => {
        async function fetchMenu() {
            try {
                const res = await axios.get("http://localhost:8080/api/kiosk/menus/active");
                setMenuList(res.data); // 배열 저장
            } catch (err) {
                console.error("메뉴 가져오기 실패:", err);
            }
        }
        fetchMenu().then(fetchMenu).catch(console.error);
    }, []);

    return (
        <section>
            <h2>🥗 활성화된 메뉴</h2>
            <ul>
                {menuList.map((menu) => (
                    <li key={menu.id}>
                        <h3>{menu.name}</h3>
                        <p>{menu.description}</p>
                        <p>{menu.price}원</p>
                        <p>카테고리: {menu.categoryName}</p>
                        {menu.imageUrl && <img src={menu.imageUrl} alt={menu.name} width="120" />}
                    </li>
                ))}
            </ul>
        </section>
    );
}