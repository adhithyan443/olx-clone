import { useDispatch, useSelector } from "react-redux"
import AppRoutes from "./routes/AppRoutes"
import { useEffect } from "react";
import { loadUser } from "./features/auth/authThunk";
import { fetchCart } from "./features/cart/cartThunk";

function App() {

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);


  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch])

  useEffect(() => {

    if (isAuthenticated) {

      dispatch(fetchCart());

    }

  }, [dispatch, isAuthenticated]);


  return <AppRoutes />
}

export default App
