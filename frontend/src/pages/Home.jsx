import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../features/product/productThunk";
import ProductCard from "../components/ProductCard";

export default function Home() {
    const dispatch = useDispatch();

    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    if (loading) {
        return (
            <h2 className="text-center mt-20">
                Loading products....
            </h2>
        );
    }

    if (error) {
        return (
            <h2 className="text-center mt-20 text-red-500">
                {error}
            </h2>
        );
    }
    return (
        <div className="bg-gray-100 min-h-screen">

            <div className="max-w-7xl mx-auto p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Fresh Recommendations
                </h1>



                {products.length === 0 ? (
                    <h2>No Products Found</h2>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                        
                    </div>

                )}

            </div>

        </div>

    );
}