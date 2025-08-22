import { useState, useEffect } from "react";
import CategoryList from "./CategoryList.jsx";
import MenuItemList from "./MenuItemList.jsx";
import OptionModal from "../../component/option/OptionModal.jsx";
import CartPanel from "./CartPanel.jsx";
import CartModal from "../../component/cart/CartModal.jsx";
import Header from "./Header.jsx";
import { getMenuList } from "../../config/api.jsx";
import useCart from "../../hooks/useCart";

export default function KioskPage() {
    const [categoryTree, setCategoryTree] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);

    /* Cart Hooks */
    const {
        cartItems,
        addToCart,
        updateItem,
        removeItem,
        updateOption,
    } = useCart();

    /* API Call */
    useEffect(() => {
        async function fetchCategories() {
            try {
                const list = await getMenuList();
                setCategoryTree(list);
                if (list.length > 0) setSelectedCategoryId(list[0].id);
            } catch (error) {
                console.error("카테고리 로드 실패:", error);
            }
        }
        fetchCategories();
    }, []);

    /* Render */
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
                    onAddToCart={addToCart}
                />
            )}

            <CartPanel cartItems={cartItems} onOpenModal={() => setIsCartModalOpen(true)} />

            {isCartModalOpen && (
                <CartModal
                    cartItems={cartItems}
                    onClose={() => setIsCartModalOpen(false)}
                    onUpdateItem={updateItem}
                    onRemoveItem={removeItem}
                    onUpdateOption={updateOption}
                />
            )}
        </div>
    );
}