import { FaHeart, FaEdit, FaTrash, } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


export default function ProductCard({ product, isOwner = false }) {

    const navigate = useNavigate();

    return (
        <Link
            to={`/products/${product.id}`}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer">

            {/* Product Image */}
            <div className="relative">

                <img
                    // src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-56 object-cover"
                />

                <button
                    onClick={(e) => e.preventDefault()}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                >
                    <FaHeart className="text-gray-500 hover:text-red-500" />
                </button>

            </div>

            {/* Product Details */}
            <div className="p-4">

                <h2 className="text-2xl font-bold text-teal-700">
                    ₹{product.price.toLocaleString()}
                </h2>

                <h3 className="font-semibold mt-2">
                    {product.title}
                </h3>

                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex justify-between items-center mt-5 text-sm text-gray-500">

                    <span>{product.category}</span>

                    <span>
                        {product.isSold ? "Sold" : "Available"}
                    </span>

                </div>

            </div>

            {isOwner && (
                <div className="mt-5 py-2 flex justify-end gap-4">

                    <button
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate(`/sell/${product.id}`)
                        }}

                    >
                        <FaEdit className="text-blue-600" />
                    </button>

                    <button
                        className="w-10 h-10 rounded-full hover:bg-red-100 flex items-center justify-center"
                    >
                        <FaTrash className="text-red-500" />
                    </button>

                </div>
            )}

        </Link>

    );
}