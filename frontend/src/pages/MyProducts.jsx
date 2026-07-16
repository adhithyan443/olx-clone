import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import { fetchMyProducts } from "../features/product/productThunk";
import { Link } from "react-router-dom";


export default function MyProducts() {

    const dispatch = useDispatch();

    const { myProducts, loading, error } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchMyProducts());
    }, [dispatch]);

    if (loading) return <h2>Loading...</h2>;

    if (error) return <h2>{error}</h2>;

    return (

        <div className="bg-gray-100 min-h-screen">

            <div className="max-w-7xl mx-auto p-6">

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-3xl font-bold">
                        My Products
                    </h1>

                </div>

                {myProducts?.length === 0 ? (
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
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {myProducts?.map((product) => (
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