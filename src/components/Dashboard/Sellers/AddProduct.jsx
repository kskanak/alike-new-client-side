import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const postDate = new Date();
  const [conditon, setCondition] = useState("");
  const [catagory, setCatagory] = useState("");
  const navigate = useNavigate();
  console.log(postDate, conditon, catagory);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const imgbbKey = process.env.REACT_APP_imgbb_key;

  const handleAddProduct = (data) => {
    const image = data.photo[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const product = {
            product_name: data.name,
            sell_price: data.price,
            years_used: data.yearused,
            seller_name: user?.displayName,
            post_time: postDate,
            location: data.location,
            condition: conditon,
            original_price: data.originalPrice,
            catagory: catagory,
            email: user?.email,
            img: imageData.data.image.url,
          };
          // save product  to db
          fetch("http://localhost:5000/catagoryProduct", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("alikeNewToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              if (result.acknowledged) {
                navigate("/dashboard/myproduct");
                toast.success(`${data.name} added successfully`);
              }
            })
            .catch((error) => error.message);
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="mt-8 px-14">
      <h2 className="text-2xl font-semibold">Add a product</h2>
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="w-[540px] rounded-lg bg-white p-12 mt-8 mx-auto"
      >
        {/* name input  */}
        <div className="space-y-1 text-sm mb-4">
          <label
            htmlFor="name"
            className="block dark:text-gray-400 font-medium"
          >
            Product Name
          </label>

          <input
            type="text"
            className="w-full px-4 py-3 rounded-md input input-bordered "
            {...register("name", { required: "User name is required" })}
          />
          {errors.name && (
            <div className="flex items-center text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-red-400 flex-shrink-0 w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{errors.name?.message}</span>
            </div>
          )}
        </div>

        {/*price input  */}

        <div className="space-y-1 text-sm mb-4">
          <label
            htmlFor="email"
            className="block dark:text-gray-400 font-medium"
          >
            Selling Price
          </label>

          <input
            type="text"
            className="w-full px-4 py-3 rounded-md input input-bordered "
            {...register("price", {
              required: "Must provide a Price",
            })}
          />
          {errors.price && (
            <div className="flex items-center text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-red-400 flex-shrink-0 w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{errors.price?.message}</span>
            </div>
          )}
        </div>

        {/* Original price input  */}

        <div className="space-y-1 text-sm mb-4">
          <label
            htmlFor="email"
            className="block dark:text-gray-400 font-medium"
          >
            originalPrice
          </label>

          <input
            type="text"
            className="w-full px-4 py-3 rounded-md input input-bordered "
            {...register("originalPrice", {
              required: "Must provide a originalPrice",
            })}
          />
          {errors.originalPrice && (
            <div className="flex items-center text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-red-400 flex-shrink-0 w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{errors.originalPrice?.message}</span>
            </div>
          )}
        </div>

        {/* condition  */}
        <div className="space-y-1 text-sm mb-4">
          <label
            htmlFor="condition"
            className="block dark:text-gray-400 font-medium"
          >
            condition
          </label>
          <select
            name="condition"
            required
            {...register("condition", { required: "Add condition" })}
            className="select select-bordered w-full mb-3 mt-2"
            onChange={(e) => setCondition(e.target.value)}
          >
            <option selected disabled>
              Select condition
            </option>
            <option value={"Excelent"}>Excelent</option>
            <option value={"Good"}>Good</option>
            <option value={"Fair"}>Fair</option>
          </select>
        </div>

        {/*yearused input  */}

        <div className="space-y-1 text-sm mb-4">
          <label
            htmlFor="email"
            className="block dark:text-gray-400 font-medium"
          >
            years Of Used?
          </label>

          <input
            type="text"
            className="w-full px-4 py-3 rounded-md input input-bordered "
            {...register("yearused", {
              required: "Must provide a yearused",
            })}
          />
          {errors.yearused && (
            <div className="flex items-center text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-red-400 flex-shrink-0 w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{errors.yearused?.message}</span>
            </div>
          )}
        </div>

        {/* catagory  */}
        <div className="space-y-1 text-sm mb-4">
          <label
            htmlFor="catagory"
            className="block dark:text-gray-400 font-medium"
          >
            Catagory
          </label>
          <select
            name="catagory"
            required
            {...register("catagory", { required: "Add catagory" })}
            className="select select-bordered w-full mb-3 mt-2"
            onChange={(e) => setCatagory(e.target.value)}
          >
            <option selected disabled>
              Select Catagory
            </option>
            <option value={"Yamaha"}>Yamaha</option>
            <option value={"Honda"}>Honda</option>
            <option value={"TVS"}>TVS</option>
          </select>
        </div>

        {/* image input  */}
        <div className="space-y-1 text-sm mb-4">
          <label
            htmlFor="name"
            className="block dark:text-gray-400 font-medium"
          >
            Item Image
          </label>

          <input
            type="file"
            className="w-full px-4 py-3 rounded-md input input-bordered "
            {...register("photo", { required: "Photo is required" })}
          />
          {errors.name && (
            <div className="flex items-center text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-red-400 flex-shrink-0 w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{errors.photo?.message}</span>
            </div>
          )}
        </div>

        {/* phone input  */}
        <div className="space-y-1 text-sm mb-4">
          <label
            htmlFor="phone"
            className="block dark:text-gray-400 font-medium"
          >
            User Phone
          </label>

          <input
            type="text"
            className="w-full px-4 py-3 rounded-md input input-bordered "
            {...register("phone", { required: "User phone is required" })}
          />
          {errors.phone && (
            <div className="flex items-center text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-red-400 flex-shrink-0 w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{errors.phone?.message}</span>
            </div>
          )}
        </div>
        {/* location input  */}
        <div className="space-y-1 text-sm mb-4">
          <label
            htmlFor="location"
            className="block dark:text-gray-400 font-medium"
          >
            Location
          </label>

          <input
            type="text"
            className="w-full px-4 py-3 rounded-md input input-bordered "
            {...register("location", { required: "User location is required" })}
          />
          {errors.location && (
            <div className="flex items-center text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-red-400 flex-shrink-0 w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{errors.location?.message}</span>
            </div>
          )}
        </div>

        <input type="submit" className="w-full btn " value="ADD" />
      </form>
    </div>
  );
};

export default AddProduct;
