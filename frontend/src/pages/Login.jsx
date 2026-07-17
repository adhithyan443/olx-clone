import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../features/auth/authThunk";

export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { loading, error, isAuthenticated } = useSelector(
        state => state.auth
    );

    const onSubmit = (data) => {
        dispatch(login(data));
    };

    useEffect(() => {

        if (isAuthenticated) {

            toast.success("Welcome back!");

            navigate("/");

        }

    }, [isAuthenticated, navigate]);

    useEffect(() => {

        if (error) {

            toast.error(error);

        }

    }, [error]);

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

                <h1 className="text-3xl font-bold text-center text-teal-700 mb-2">
                    Welcome Back
                </h1>

                <p className="text-gray-500 text-center mb-8">
                    Login to continue buying and selling.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    {/* Email */}

                    <div>

                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />

                        {errors.email && (

                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>

                        )}

                    </div>

                    {/* Password */}

                    <div>

                        <label className="block mb-2 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />

                        {errors.password && (

                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>

                        )}

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition disabled:bg-gray-400"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="text-center mt-6 text-gray-600">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-teal-700 font-semibold ml-2 hover:underline"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );

}