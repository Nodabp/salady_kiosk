import { useState } from 'react';
import Modal from './Modal';

export default function MenuItemList({menuList} ) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <ul>
                {menuList.map((menu) => (
                    <li key={menu.id} className="bg-gray-100 p-4 rounded shadow hover:bg-gray-200 cursor-pointer" onClick={() => setIsOpen(true)}>
                        <h3>{menu.name}</h3>
                        <p>{menu.description}</p>
                        <p>{menu.price}원</p>
                        <p>카테고리: {menu.categoryName}</p>
                        {menu.imageUrl && <img src={menu.imageUrl} alt={menu.name} />}
                    </li>
                ))}
            </ul>


            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={`${name} 옵션`}>
                <label className="block mb-2">
                    <input type="checkbox" /> 치킨 추가 (+2,000원)
                </label>
                <label className="block mb-2">
                    <input type="checkbox" /> 아보카도 추가 (+1,500원)
                </label>
            </Modal>
        </>
    );
}