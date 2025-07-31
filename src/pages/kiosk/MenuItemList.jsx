export default function MenuItemList({ menus, onClickMenu }) {
    if (!menus.length) {
        return <div className="px-4 py-6 text-gray-500">해당 카테고리에 등록된 메뉴가 없습니다.</div>;
    }

    return (
        <div className="grid grid-cols-3 gap-6 px-6 py-4">
            {menus.map((menu) => (
                <button
                    key={menu.id}
                    onClick={() => menu.active && onClickMenu(menu)}
                    disabled={!menu.active}
                    className={`relative bg-white border border-green-100 rounded-2xl shadow p-4 text-left transition
                        ${menu.active ? "hover:shadow-lg" : "opacity-50 cursor-not-allowed"}`}
                >
                    <img
                        src={menu.imageUrl ?? "/images/placeholder.png"}
                        alt={menu.name}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                    {/* 품절 판단 */}
                    {!menu.active && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center
                                rounded-2xl text-white text-2xl font-bold">
                            SOLD OUT
                        </div>
                    )}

                    <div className="text-xl font-bold text-green-900">{menu.name}</div>
                    <div className="text-lg text-gray-700 mt-2">{menu.price.toLocaleString()}원</div>
                </button>
            ))}
        </div>
    );
}