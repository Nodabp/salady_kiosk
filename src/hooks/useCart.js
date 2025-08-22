import { useState } from "react";
import { calculateTotalPrice } from "../utils/price";

export default function useCart() {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (menuData) => {
        setCartItems((prev) => {
            const index = prev.findIndex(
                (item) =>
                    item.menuId === menuData.menuId &&
                    JSON.stringify(item.options) === JSON.stringify(menuData.options)
            );

            if (index !== -1) {
                const updated = [...prev];
                const newQuantity = updated[index].quantity + menuData.quantity;
                updated[index] = {
                    ...updated[index],
                    quantity: newQuantity,
                    totalPrice: calculateTotalPrice(menuData.basePrice, menuData.options, newQuantity),
                };
                return updated;
            } else {
                return [
                    ...prev,
                    {
                        ...menuData,
                        totalPrice: calculateTotalPrice(menuData.basePrice, menuData.options, menuData.quantity),
                    },
                ];
            }
        });
    };

    const updateItem = (index, newQuantity) => {
        setCartItems((prev) => {
            const updated = [...prev];
            if (newQuantity <= 0) {
                updated.splice(index, 1);
                return updated;
            }
            const item = updated[index];
            updated[index] = {
                ...item,
                quantity: newQuantity,
                totalPrice: calculateTotalPrice(item.basePrice, item.options, newQuantity),
            };
            return updated;
        });
    };

    const removeItem = (index) => {
        setCartItems((prev) => {
            const updated = [...prev];
            updated.splice(index, 1);
            return updated;
        });
    };

    const updateOption = (itemIndex, optionIndex, newQuantity) => {
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

            item.options = options;
            item.totalPrice = calculateTotalPrice(item.basePrice, options, item.quantity);
            updated[itemIndex] = item;
            return updated;
        });
    };

    return {
        cartItems,
        addToCart,
        updateItem,
        removeItem,
        updateOption,
    };
}