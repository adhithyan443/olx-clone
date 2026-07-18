import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { useEffect, useMemo, useState } from "react";
import { fetchMyProducts } from "../features/product/productThunk";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function MyProducts() {

    const dispatch = useDispatch();

    const { myProducts, loading, error } = useSelector(
        (state) => state.products
    );

    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchMyProducts());
    }, [dispatch]);

    const filteredProducts = useMemo(() => {

        if (!search.trim()) return myProducts;

        return myProducts.filter((product) => {

            const keyword = search.toLowerCase();

            return (
                product.title.toLowerCase().includes(keyword) ||
                product.description.toLowerCase().includes(keyword) ||
                product.category.toLowerCase().includes(keyword)
            );

        });

    }, [myProducts, search]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h2 className="text-xl font-semibold">Loading...</h2>
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

        <div className="bg-gray-100 min-h-screen pt-24">

            <div className="max-w-7xl mx-auto px-6">

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

                    <h1 className="text-3xl font-bold">
                        My Products
                    </h1>

                    <div className="relative w-full md:w-96">

                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="text"
                            placeholder="Search my products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />

                    </div>

                </div>

                {myProducts.length === 0 ? (

                    <div className="text-center py-20">

                        <h2 className="text-2xl font-semibold text-gray-700">
                            No products yet
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Start selling by adding your first product.
                        </p>

                        <Link
                            to="/sell"
                            className="inline-block mt-6 bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800"
                        >
                            Sell Product
                        </Link>

                    </div>

                ) : filteredProducts.length === 0 ? (

                    <div className="text-center py-20">

                        <h2 className="text-2xl font-semibold text-gray-700">
                            No matching products found
                        </h2>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {filteredProducts.map((product) => (

                            <ProductCard
                                key={product.id}
                                product={product}
                                isOwner={true}
                            />

                        ))}

                    </div>

                )}

            </div>

        </div>

    );
}