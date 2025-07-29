export default function MenuItemList({ menus, onClickMenu }) {
    if (!menus.length) {
        return <div className="px-4 py-6 text-gray-500">해당 카테고리에 등록된 메뉴가 없습니다.</div>;
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            {menus.map((menu) => (
                <button
                    key={menu.id}
                    onClick={() => onClickMenu(menu)}
                    className="bg-white border rounded-lg shadow hover:shadow-md transition p-4 text-left"
                >
                    <img
                        src={menu.imageUrl ?? "/images/placeholder.png"}
                        alt={menu.name}
                        className="w-full h-28 object-cover rounded-md mb-2"
                    />
                    <div className="font-semibold">{menu.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{menu.price.toLocaleString()}원</div>
                </button>
            ))}
        </div>
    );
}