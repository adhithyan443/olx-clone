import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { login } from "../features/auth/authThunk"


export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
    } = useForm();

    const { loading, error, isAuthenticated } = useSelector(state => state.auth)

    const onSubmit = (data) => {
        dispatch(login(data))
    }

    useEffect(() => {

        if (isAuthenticated) {
            navigate("/profile")
        }
    }, [isAuthenticated, navigate])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <input
                type="email"
                placeholder="Email"
                {...register("email", {
                    required: "Email is required"
                })}
            />
            <br />
            <br />

            <input type="password" placeholder="Password"
                {...register("password", {
                    required: "Password is required"
                })}
            />

            <br />
            <br />

            <button
                type="submit"
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            {
                error && (

                    <p>

                        {error}

                    </p>

                )
            }
            <p>

                Don't have an account?

                <Link to="/register">

                    Register

                </Link>

            </p>
        </form >

    );
}