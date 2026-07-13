import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Profile from "../pages/Profile"
import NotFound from "../pages/NotFound"
import ProtectedRoute from "../components/ProtectedRoute"
export default function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />
                    
                </Route>

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    )
}