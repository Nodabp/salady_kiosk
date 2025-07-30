import { useState, useEffect } from "react";
import axios from "axios";
import CategoryList from "./CategoryList";
import MenuItemList from "./MenuItemList";
import OptionModal from "./OptionModal";
import CartPanel from "./CartPanel";
import CartModal from "./CartModal";
import Header from "../../components/Header.jsx";

export default function KioskPage() {
    const [categoryTree, setCategoryTree] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await axios.get("http://localhost:8080/api/kiosk/menus/category/active");
                setCategoryTree(res.data);
                if (res.data.length > 0) setSelectedCategoryId(res.data[0].id);
            } catch (error) {
                console.error("카테고리 로드 실패:", error);
            }
        }
        fetchCategories();
    }, []);

    const handleAddToCart = (menuData) => {
        setCartItems((prev) => {
            // 옵션까지 동일한지 비교
            const index = prev.findIndex((item) =>
                item.menuId === menuData.menuId &&
                JSON.stringify(item.options) === JSON.stringify(menuData.options)
            );

            if (index !== -1) {
                // 기존 아이템 수량 + 가격 업데이트
                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    quantity: updated[index].quantity + menuData.quantity,
                    totalPrice: updated[index].totalPrice + menuData.totalPrice,
                };
                return updated;
            } else {
                return [...prev, menuData];
            }
        });
    };

    const handleCheckout = () => {
        console.log("주문 데이터:", cartItems);
        // TODO: 결제 페이지 이동 or 서버 전송
    };

    const selectedCategory = categoryTree.find((cat) => cat.id === selectedCategoryId);
    const menus = selectedCategory?.menus ?? [];


    function optionIdToName(optionId) {
        categoryTree.forEach((cat) => {
            cat.options.forEach((opt) => {
                if(opt.id === optionId) {return opt.name}else{return "옵션"}
            })
        })
    }

    return (
        <div className="bg-white min-h-screen text-black pb-24">
            <Header />
            <CategoryList categories={categoryTree} selectedId={selectedCategoryId} onSelect={setSelectedCategoryId} />
            <MenuItemList menus={menus} onClickMenu={(menu) => setSelectedMenu(menu)} />

            {selectedMenu && (
                <OptionModal
                    menu={selectedMenu}
                    onClose={() => setSelectedMenu(null)}
                    onAddToCart={handleAddToCart}
                />
            )}

            <CartPanel
                cartItems={cartItems}
                onOpenModal={() => setIsCartModalOpen(true)}
                onCheckout={handleCheckout}
            />

            {isCartModalOpen && (
                <CartModal
                    cartItems={cartItems}
                    onClose={() => setIsCartModalOpen(false)}
                    optionIdToName={optionIdToName}
                />
            )}
        </div>
    );
}
