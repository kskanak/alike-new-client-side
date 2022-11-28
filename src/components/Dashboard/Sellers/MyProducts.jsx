import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  console.log(user?.email);
  const {
    data: myProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/sellerProducts/${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  // handle delete
  const handleDeleteProduct = (product) => {
    Swal.fire({
      title: `You sure wanna delete ${product.product_name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/deleteSellerProduct/${product?._id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("alikeNewToken")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your Product has been deleted successfully.",
                "success"
              );
              refetch();
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  if (isLoading) {
    <div className="flex items-center justify-center h-96">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
    </div>;
  }
  console.log(myProducts);
  return (
    <div className="mt-8 px-14">
      <h2 className="text-2xl">All Users</h2>
      <div className="overflow-x-auto  rounded-lg mt-6">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Sales Status</th>
              <th>Advertise</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {myProducts?.length &&
              myProducts?.map((product, index) => {
                return (
                  <tr className="hover" key={index}>
                    <th>{index + 1}</th>
                    <td>{product.product_name}</td>
                    <td>{product.sell_price}</td>
                    <td>{product.payment === "paid" ? "Sold" : "Available"}</td>
                    <td>
                      {product?.role === "admin" ? (
                        <button className="btn btn-sm btn-primary">
                          Admin
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-accent"
                          // onClick={() => handleAdvertise(product?._id)}
                        >
                          Advertise
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDeleteProduct(product)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
