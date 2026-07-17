export default function FilterBar({
    filters,
    setFilters,
    applyFilters,
    resetFilters,
}) {
    return (
        <div className="bg-white rounded-xl shadow-md p-5 mb-6">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

                <input
                    type="number"
                    placeholder="Minimum Price"
                    value={filters.minPrice}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            minPrice: e.target.value,
                        })
                    }
                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />

                <input
                    type="number"
                    placeholder="Maximum Price"
                    value={filters.maxPrice}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            maxPrice: e.target.value,
                        })
                    }
                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />

                <select
                    value={filters.sort}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            sort: e.target.value,
                        })
                    }
                    className="border rounded-lg px-4 py-3"
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="price_asc">Price: Low → High</option>
                    <option value="price_desc">Price: High → Low</option>
                </select>

                <button
                    onClick={applyFilters}
                    className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-4 py-3 font-medium transition"
                >
                    Apply
                </button>

                <button
                    onClick={resetFilters}
                    className="border rounded-lg px-4 py-3 hover:bg-gray-100 transition"
                >
                    Reset
                </button>

            </div>

        </div>
    );
}