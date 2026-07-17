import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createProducts, fetchProductsById,updateProduct } from "../features/product/productThunk";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";


export default function Sell() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    // console.log(id);

    const { register, handleSubmit, formState: { errors }, setValue, } = useForm({
        defaultValues: {
            title: "",
            description: "",
            price: "",
            category: "",
            imageUrl: "",
        },
    });

    useEffect(() => {

        if (id) {
            dispatch(fetchProductsById(id));
        }

    }, [id, dispatch]);

    const { product, loading, error } = useSelector(
        state => state.products
    );

    useEffect(() => {

        if (id && product) {

            setValue("title", product.title);
            setValue("description", product.description);
            setValue("price", product.price);
            setValue("category", product.category);
            setValue("imageUrl", product.imageUrl);

        }

    }, [id, product, setValue]);





    const onSubmit = async (data) => {
        console.log(data);
        
        let result;

        if (id) {
            result = await dispatch(

                updateProduct({
                    id,
                    data,
                })
            );
        } else {
            result = await dispatch(createProducts(data));
        }

        if (
            updateProduct.fulfilled.match(result) ||
            createProducts.fulfilled.match(result)
        ) {
            navigate("/my-products");
        }
    };

    if (id && loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-xl font-semibold">
                    Loading product...
                </h2>
            </div>
        );
    }

    if (id && error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-red-500">
                    {error}
                </h2>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen  pt-25">

            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8">

                <h1 className="text-3xl font-bold mb-8">
                    {id
                        ? "Update your product details"
                        : "Fill in the details to list your product"}
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >

                    {/* Title */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Product Title
                        </label>

                        <input
                            type="text"
                            placeholder="Enter product name "
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
                            {...register("title", {
                                required: "Title is required"
                            })}
                        />

                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Description
                        </label>

                        <textarea
                            rows="5"
                            placeholder="Describe your product..."
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
                            {...register("description", {
                                required: "Description is required",
                                minLength: {
                                    value: 10,
                                    message: "Description should be at least 10 characters"
                                }
                            })}
                        />

                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Price
                        </label>

                        <input
                            type="number"
                            placeholder="Enter price"
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
                            {...register("price", {
                                required: "Price is required",
                                min: {
                                    value: 1,
                                    message: "Price must be greater than 0"
                                },
                                valueAsNumber: true
                            })}
                        />

                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.price.message}
                            </p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Category
                        </label>

                        <select
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
                            {...register("category", {
                                required: "Category is required"
                            })}
                        >
                            <option value="">Select Category</option>
                            <option value="Mobile">Mobile</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Monitor">Monitor</option>
                            <option value="Bike">Bike</option>
                            <option value="Car">Car</option>
                            <option value="Furniture">Furniture</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.category.message}
                            </p>
                        )}
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Image URL
                        </label>

                        <input
                            type="text"
                            placeholder="https://example.com/image.jpg"
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-600"
                            {...register("imageUrl", {
                                required: "Image URL is required"
                            })}
                        />
                        {errors.imageUrl && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.imageUrl.message}
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition"
                    >
                        {id ? "Update Product" : "Post Product"}
                    </button>

                    {error && (
                        <p className="text-red-500 text-center mt-4">
                            {error}
                        </p>
                    )}

                </form>

            </div>

        </div>
    );
}