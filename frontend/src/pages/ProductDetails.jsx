import { useEffect } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductsById } from "../features/product/productThunk";
import { addToCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

export default function ProductDetails() {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { product, loading, error } = useSelector((state) => state.products)
    const { user } = useSelector(state => state.auth);
    const { items } = useSelector(state => state.cart);


    useEffect(() => {
        dispatch(fetchProductsById(id));
    }, [dispatch, id]);

    if (loading) return <h2 className="text-center mt-20">Loading...</h2>;;

    if (error) return <h2 className="text-center mt-20">{error}</h2>;

    if (!product) return <h2 className="text-center mt-20">Product not found</h2>;

    const isOwner = user?.id === product?.userId;

    const handleAddToCart = () => {

        const alreadyExists = items.some(
            item => item.id === product.id
        );

        if (alreadyExists) {
            toast.info("Product is already in your cart");
            return;
        }

        dispatch(addToCart(product));

        toast.success("Product added to cart");
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">

            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md p-8 grid md:grid-cols-2 gap-10">

                {/* Left */}
                <div>

                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-[500px] object-cover rounded-xl"
                    />

                </div>

                {/* Right */}
                <div>

                    <span
                        className={`px-3 py-1 rounded-full text-sm ${product.isSold
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-700"
                            }`}
                    >
                        {product.isSold ? "Sold" : "Available"}
                    </span>

                    <h1 className="text-4xl font-bold mt-5">
                        {product.title}
                    </h1>

                    <p className="text-4xl font-bold text-teal-700 mt-5">
                        ₹{product.price.toLocaleString()}
                    </p>

                    <div className="mt-6">

                        <h2 className="font-semibold text-lg">
                            Description
                        </h2>

                        <p className="text-gray-600 mt-2 leading-7">
                            {product.description}
                        </p>

                    </div>

                    <div className="mt-8 space-y-3">

                        <p>
                            <strong>Category:</strong> {product.category}
                        </p>

                        {/* <p>
                            <strong>Seller:</strong> Adhithyan
                        </p> */}

                    </div>

                    <div className="flex gap-4 mt-10">

                        {product.isSold ? (

                            <button
                                disabled
                                className="flex-1 bg-red-400 text-white py-3 rounded-xl cursor-not-allowed"
                            >
                                Product Sold
                            </button>

                        ) : isOwner ? (

                            <button
                                disabled
                                className="flex-1 bg-gray-400 text-white py-3 rounded-xl cursor-not-allowed"
                            >
                                This is Your Product
                            </button>

                        ) : (

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-teal-700 text-white py-3 rounded-xl flex justify-center items-center gap-3 hover:bg-teal-800"
                            >
                                <FaShoppingCart />
                                Add to Cart
                            </button>

                        )}

                        <button className="w-14 h-14 rounded-xl border flex justify-center items-center hover:bg-red-50">

                            <FaHeart className="text-red-500" />

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}