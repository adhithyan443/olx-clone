import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice";

export default function Cart() {

    const dispatch = useDispatch();

    const { items } = useSelector(state => state.cart);

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

        (sum, item) => sum + item.price,

        0

    );

    return (

        <div className="bg-gray-100 min-h-screen py-10">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold mb-8">
                    My Cart
                </h1>

                <div className="space-y-6">

                    {items.map(product => (

                        <div
                            key={product.id}
                            className="bg-white rounded-xl shadow flex p-5 gap-6"
                        >

                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="w-40 h-40 object-cover rounded-lg"
                            />

                            <div className="flex-1">

                                <h2 className="text-2xl font-semibold">
                                    {product.title}
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    {product.category}
                                </p>

                                <p className="text-3xl font-bold text-teal-700 mt-4">
                                    ₹{product.price.toLocaleString()}
                                </p>

                            </div>

                            <button
                                onClick={() => dispatch(removeFromCart(product.id))}
                                className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600 h-fit"
                            >
                                Remove
                            </button>

                        </div>



                    ))}

                    <div className="mt-10 bg-white rounded-xl shadow p-6">

                        <div className="flex justify-between text-2xl font-bold">

                            <span>Total</span>

                            <span>₹{total.toLocaleString()}</span>

                        </div>

                    </div>

                    <button
                        className="w-full mt-6 bg-teal-700 text-white py-4 rounded-lg hover:bg-teal-800"
                    >
                        Proceed to Checkout
                    </button>

                </div>

            </div>

        </div>

    );
}