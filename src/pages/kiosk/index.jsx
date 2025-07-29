import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/Header.jsx";
import CategoryList from "./CategoryList.jsx";
import MenuItemList from "./MenuItemList.jsx";
import OptionModal from "./OptionModal.jsx";
import CartPanel from "./CartPanel.jsx";

export default function KioskPage() {
    const [categoryTree, setCategoryTree] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await axios.get("http://localhost:8080/api/kiosk/menus/category/active");
                setCategoryTree(res.data);
                // 최초 선택 카테고리 세팅
                if (res.data.length > 0) setSelectedCategoryId(res.data[0].id);
            } catch (error) {
                console.error("카테고리 트리 가져오기 실패:", error);
            }
        }
        fetchCategories();
    }, []);

    const selectedCategory = categoryTree.find((cat) => cat.id === selectedCategoryId);
    const menus = selectedCategory?.menus ?? [];

    return (
        <div className="bg-white min-h-screen text-black">
            <Header />

            {/* 카테고리 리스트 */}
            <CategoryList
                categories={categoryTree}
                selectedId={selectedCategoryId}
                onSelect={setSelectedCategoryId}
            />

            {/* 메뉴 출력 */}
            <div className="p-8">
                <MenuItemList menus={menus} onClickMenu={(menu) => {
                    const withOptions = {
                        ...menu,
                        options: menu.menuOptions,
                    };
                    setSelectedMenu(withOptions);
                }}
                />
            </div>

            {/* 옵션 모달 */}
            {selectedMenu && (
                <OptionModal
                    menu={selectedMenu}
                    onClose={() => setSelectedMenu(null)}
                    onAddToCart={(menuData) => {
                        // TODO: cart에 추가 로직
                        console.log("담기", menuData);
                        setSelectedMenu(null);
                    }}
                />
            )}

            {/* 장바구니 */}
            <CartPanel />
        </div>
    );
}