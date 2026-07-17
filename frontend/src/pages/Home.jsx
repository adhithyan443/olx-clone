import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/productThunk";
import FilterBar from "../components/FilterBar";
import ProductGrid from "../components/ProductGrid";
import CategorySidebar from "../components/CategorySidebar";

export default function Home() {
    const dispatch = useDispatch();

    const { products, loading, error } = useSelector(
        (state) => state.products
    );

    const [filters, setFilters] = useState({
        category: "",
        minPrice: "",
        maxPrice: "",
        sort: "newest",
    });

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const applyFilters = (currentFilters = filters) => {
        dispatch(fetchProducts(currentFilters));
    };

    const resetFilters = () => {
        const reset = {
            category: "",
            minPrice: "",
            maxPrice: "",
            sort: "newest",
        };

        setFilters(reset);
        dispatch(fetchProducts(reset));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h2 className="text-xl font-semibold">
                    Loading products...
                </h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h2 className="text-red-500">{error}</h2>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen pt-16">

            {/* Left Sidebar */}
            <CategorySidebar
                filters={filters}
                setFilters={setFilters}
                applyFilters={applyFilters}
            />

            {/* Main Content */}
            <div className="ml-72 px-8 py-8">

                <div className="max-w-7xl mx-auto">

                    <h1 className="text-3xl font-bold mb-8">
                        Fresh Recommendations
                    </h1>

                    <FilterBar
                        filters={filters}
                        setFilters={setFilters}
                        applyFilters={applyFilters}
                        resetFilters={resetFilters}
                    />

                    <ProductGrid products={products} />

                </div>

            </div>

        </div>
    );
}