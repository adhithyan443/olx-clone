import { useDispatch } from "react-redux"
import AppRoutes from "./routes/AppRoutes"
import { useEffect } from "react";
import { loadUser } from "./features/auth/authThunk";

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{

    const token = localStorage.getItem("token");

    if (token){
      dispatch(loadUser());
    }
  })

  return <AppRoutes />
}

export default App
