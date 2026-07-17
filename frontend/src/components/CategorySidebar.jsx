export default function CategorySidebar({
    filters,
    setFilters,
    applyFilters,
}) {
    const categories = [
        "All",
        "Mobile",
        "Laptop",
        "Bike",
        "Car",
        "Furniture",
        "Other",
    ];

    return (
        <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-white shadow-lg  p-6 overflow-y-auto">

            <h2 className="text-xl font-bold mb-6">
                Categories
            </h2>

            <div className="space-y-2">

                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => {
                            const newFilters = {
                                ...filters,
                                category: category === "All" ? "" : category,
                            };

                            setFilters(newFilters);
                            applyFilters(newFilters);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${(category === "All" &&
                            filters.category === "") ||
                            filters.category === category
                            ? "bg-teal-600 text-white"
                            : "hover:bg-gray-100"
                            }`}
                    >
                        {category}
                    </button>
                ))}

            </div>

        </aside>
    );
}