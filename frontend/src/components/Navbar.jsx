

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
    FaSearch,
    FaBell,
    FaHeart,
    FaShoppingCart,
    // FaUserCircle,
} from "react-icons/fa";

export default function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, user } = useSelector(
        (state) => state.auth
    );

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };
    return (
        <nav  className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between ">

                {/* Left */}
                <div className="flex items-center gap-10">

                    <Link
                        to="/"
                        className="text-3xl font-bold text-teal-700"
                    >
                        OLX
                    </Link>

                    <div className="hidden md:flex gap-6 font-medium text-gray-700">

                        <Link
                            to="/"
                            className="hover:text-teal-700"
                        >
                            Home
                        </Link>

                        <Link
                            to="/sell"
                            className="hover:text-teal-700"
                        >
                            Sell
                        </Link>

                        <Link
                            to="/my-products"
                            className="hover:text-teal-700"
                        >
                            My Products
                        </Link>

                    </div>

                </div>

                {/* Search */}
                <div className="hidden lg:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">

                    <FaSearch className="text-gray-500" />

                    <input
                        type="text"
                        placeholder="Search products..."
                        className="bg-transparent outline-none ml-3 w-full"
                    />

                </div>

                {/* Right */}
                <div className="flex items-center gap-5">

                    <button>
                        <FaHeart
                            size={20}
                            className="text-gray-600 hover:text-red-500"
                        />
                    </button>

                    <button>
                        <FaBell
                            size={20}
                            className="text-gray-600 hover:text-teal-700"
                        />
                    </button>

                    <Link
                        to="/cart"
                        className="hover:text-teal-600"
                    >
                        <FaShoppingCart
                        
                            size={20}
                            className="text-gray-600 hover:text-teal-700 cursor-pointer"
                        />
                    </Link>

                    {/* <FaUserCircle
                        size={34}
                        className="text-gray-600 cursor-pointer"
                    /> */}

                    {isAuthenticated ? (
                        <>
                            <span className="font-medium text-gray-700">
                                Hi, {user?.name}
                            </span>

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-teal-700 text-white px-5 py-2 rounded-lg hover:bg-teal-800"
                        >
                            Login
                        </Link>
                    )}


                </div>

            </div>
        </nav>
    );
}