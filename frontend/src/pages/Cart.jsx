import { useDispatch, useSelector } from "react-redux";
import {
    removeProductFromCart,
    clearUserCart,
} from "../features/cart/cartThunk";
import { useNavigate } from "react-router-dom";
import {
    checkoutProducts,
    fetchProducts,
} from "../features/product/productThunk";
import { toast } from "react-toastify";

export default function Cart() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { items } = useSelector((state) => state.cart);
    const { loading } = useSelector((state) => state.products);

    const handleCheckout = async () => {

        const productIds = items.map((item) => item.ProductID);

        const result = await dispatch(
            checkoutProducts(productIds)
        );

        if (checkoutProducts.fulfilled.match(result)) {

            await dispatch(clearUserCart());

            dispatch(fetchProducts());

            toast.success("Checkout completed successfully!");

            navigate("/");

        } else {

            toast.error(result.payload || "Checkout failed");

        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center">

                <h1 className="text-3xl font-bold">
                    Your cart is empty
                </h1>

                <p className="text-gray-500 mt-3">
                    Add products to continue shopping.
                </p>

            </div>
        );
    }

    const total = items.reduce(
        (sum, item) => sum + item.Product.Price,
        0
    );

    return (
        <div className="bg-gray-100 min-h-screen pt-24">

            <div className="max-w-6xl mx-auto px-4">

                <h1 className="text-3xl font-bold mb-8">
                    My Cart
                </h1>

                <div className="space-y-6">

                    {items.map((item) => (

                        <div
                            key={item.ID}
                            className="bg-white rounded-xl shadow flex gap-6 p-5"
                        >

                            <img
                                src={item.Product.ImageURL}
                                alt={item.Product.Title}
                                className="w-40 h-40 object-cover rounded-lg"
                            />

                            <div className="flex-1">

                                <h2 className="text-2xl font-semibold">
                                    {item.Product.Title}
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    {item.Product.Category}
                                </p>

                                <p className="text-3xl font-bold text-teal-700 mt-4">
                                    ₹{item.Product.Price.toLocaleString()}
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    dispatch(
                                        removeProductFromCart(item.ProductID)
                                    )
                                }
                                className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600 h-fit"
                            >
                                Remove
                            </button>

                        </div>

                    ))}

                    <div className="bg-white rounded-xl shadow p-6">

                        <div className="flex justify-between text-2xl font-bold">

                            <span>Total</span>

                            <span>
                                ₹{total.toLocaleString()}
                            </span>

                        </div>

                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={loading}
                        className="w-full mt-6 bg-teal-700 text-white py-4 rounded-lg hover:bg-teal-800 disabled:bg-gray-400"
                    >
                        {loading ? "Processing..." : "Proceed to Checkout"}
                    </button>

                </div>

            </div>

        </div>
    );
}