import api from "../../api/axios";

export const getProducts = async (params = {}) => {

    console.log(params);
    
    const response = await api.get("/products", {
        params
    });

    return response.data;
}

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);

    return response.data;
}

export const createProduct = async (productData) => {
    const response = await api.post("/products", productData);

    return response.data;
}


export const updateProduct = async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
}


export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);

    return response.data;
}

export const getMyProducts = async () => {
    const response = await api.get("/my-products");

    return response.data;
}

export const checkout = async (productIds) => {
    const response = await api.post("/checkout", { productIds })

    return response.data
}


