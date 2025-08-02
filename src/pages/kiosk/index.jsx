import { useState, useEffect } from "react";
import axios from "axios";
import CategoryList from "./CategoryList";
import MenuItemList from "./MenuItemList";
import OptionModal from "./OptionModal";
import CartPanel from "./CartPanel";
import CartModal from "./CartModal";
import Header from "./Header.jsx";

export default function KioskPage() {
    const [categoryTree, setCategoryTree] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await axios.get("http://localhost:8080/api/menus/all");
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
            const index = prev.findIndex(
                (item) =>
                    item.menuId === menuData.menuId &&
                    JSON.stringify(item.options) === JSON.stringify(menuData.options)
            );

            const optionUnitPrice = menuData.options.reduce(
                (sum, opt) => sum + (opt.extraPrice || 0) * opt.quantity,
                0
            );

            if (index !== -1) {
                const updated = [...prev];
                const newQuantity = updated[index].quantity + menuData.quantity;

                updated[index] = {
                    ...updated[index],
                    quantity: newQuantity,
                    totalPrice: (menuData.basePrice + optionUnitPrice) * newQuantity,
                };
                return updated;
            } else {
                return [
                    ...prev,
                    {
                        ...menuData,
                        totalPrice: (menuData.basePrice + optionUnitPrice) * menuData.quantity,
                    },
                ];
            }
        });
    };

    //  장바구니 모달 열기
    const handleOpenCartModal = () => {
        setIsCartModalOpen(true);
        console.log("모달열기")
    };

    //  장바구니 모달 닫기
    const handleCloseCartModal = () => {
        setIsCartModalOpen(false);
        console.log("모달닫기")
    };

    const handleUpdateItem = (index, newQuantity) => {
        setCartItems((prev) => {
            const updated = [...prev];
            if (newQuantity <= 0) {
                updated.splice(index, 1);
                return updated;
            }
            const item = updated[index];
            const optionUnitPrice = item.options.reduce(
                (sum, opt) => sum + (opt.extraPrice || 0) * opt.quantity,
                0
            );
            updated[index] = {
                ...item,
                quantity: newQuantity,
                totalPrice: (item.basePrice + optionUnitPrice) * newQuantity,
            };
            return updated;
        });
    };

    const handleRemoveItem = (index) => {
        setCartItems((prev) => {
            const updated = [...prev];
            updated.splice(index, 1);
            return updated;
        });
    };

    const handleUpdateOption = (itemIndex, optionIndex, newQuantity) => {
        setCartItems((prev) => {
            const updated = [...prev];
            const item = { ...updated[itemIndex] };
            const options = [...item.options];

            if (newQuantity <= 0) {
                options.splice(optionIndex, 1);
            } else {
                options[optionIndex] = {
                    ...options[optionIndex],
                    quantity: newQuantity,
                };
            }

            const optionUnitPrice = options.reduce(
                (sum, opt) => sum + (opt.extraPrice || 0) * opt.quantity,
                0
            );

            item.options = options;
            item.totalPrice = (item.basePrice + optionUnitPrice) * item.quantity;

            updated[itemIndex] = item;
            return updated;
        });
    };

    const selectedCategory = categoryTree.find((cat) => cat.id === selectedCategoryId);
    const menus = selectedCategory?.menus ?? [];

    return (
        <div className="bg-white min-h-screen text-black pb-24">
            <Header />
            <CategoryList
                categories={categoryTree}
                selectedId={selectedCategoryId}
                onSelect={setSelectedCategoryId}
            />
            <MenuItemList menus={menus} onClickMenu={(menu) => setSelectedMenu(menu)} />

            {selectedMenu && (
                <OptionModal
                    menu={selectedMenu}
                    onClose={() => setSelectedMenu(null)}
                    onAddToCart={handleAddToCart}
                />
            )}

            {/* CartPanel에 함수 전달 */}
            <CartPanel
                cartItems={cartItems}
                onOpenModal={handleOpenCartModal}
            />

            {isCartModalOpen && (
                <CartModal
                    cartItems={cartItems}
                    onClose={handleCloseCartModal}
                    onUpdateItem={handleUpdateItem}
                    onRemoveItem={handleRemoveItem}
                    onUpdateOption={handleUpdateOption}
                />
            )}
        </div>
    );
}
