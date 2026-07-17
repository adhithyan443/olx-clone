import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { register as registerUser } from "../features/auth/authThunk";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password");

    const { loading, error } = useSelector(state => state.auth);

    const onSubmit = async (data) => {

        const result = await dispatch(registerUser(data));

        if (registerUser.fulfilled.match(result)) {

            toast.success("Registration successful!");

            navigate("/login");

        } else {

            toast.error(result.payload);

        }

    };

    useEffect(() => {

        if (error) {

            toast.error(error);

        }

    }, [error]);

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

                <h1 className="text-3xl font-bold text-center text-teal-700 mb-2">
                    Create Account
                </h1>

                <p className="text-gray-500 text-center mb-8">
                    Sign up to start buying and selling.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    {/* Name */}

                    <div>

                        <label className="block mb-2 font-medium">
                            Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />

                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}

                    </div>

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
                                    message: "Invalid email",
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
                            placeholder="Enter password"
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters",
                                },
                            })}
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}

                    </div>

                    {/* Confirm Password */}

                    <div>

                        <label className="block mb-2 font-medium">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
                            {...register("confirmPassword", {
                                required: "Confirm your password",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                        />

                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition disabled:bg-gray-400"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                </form>

                <p className="text-center mt-6 text-gray-600">

                    Already have an account?

                    <Link
                        to="/login"
                        className="text-teal-700 font-semibold ml-2 hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}