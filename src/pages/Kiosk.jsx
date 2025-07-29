import Header from '../components/Header';
import MenuItemList from '../components/MenuItemList.jsx';
import Cart from '../components/Cart';
import CategoryList from '../components/CategoryList';
import {useEffect, useState} from "react";
import axios from "axios";

export default function Kiosk() {

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
        fetchMenu();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-4">
            <Header />
            <CategoryList />
            <div className="grid grid-cols-2 gap-4 mt-4">
                <MenuItemList menuList={menuList} />
            </div>
            <Cart />
        </div>
    );
}