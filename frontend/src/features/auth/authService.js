import api from "../../api/axios";

export const loginUser = async (userData) => {
    const response = await api.post(
        "login",
        userData
    );

    return response.data;
}

export const getProfile = async () => {
    const response = await api.get("/profile");
    return response.data;
}