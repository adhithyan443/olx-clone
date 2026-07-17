import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {

    if (!products || products.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-md p-20 text-center">

                <h2 className="text-2xl font-bold text-gray-700">
                    No Products Found
                </h2>

                <p className="text-gray-500 mt-3">
                    Try changing the filters or category.
                </p>

            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}

        </div>
    );
}