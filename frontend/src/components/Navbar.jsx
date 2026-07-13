import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

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
        
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
                borderBottom: "1px solid #ccc",
            }}
        >
            <Link to="/">OLX Clone</Link>
            

            <div>

                {!isAuthenticated ? (

                    <Link to="/login">Login</Link>

                ) : (

                    <>
                        <span
                            style={{
                                marginRight: "20px",
                            }}
                        >
                            Welcome {user?.name}
                        </span>

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>

                )}

            </div>

        </nav>
    );
}