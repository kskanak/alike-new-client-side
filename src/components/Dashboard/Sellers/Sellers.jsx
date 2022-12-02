import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";
import Swal from "sweetalert2";

const Sellers = () => {
  const {
    data: sellers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allseller"],
    queryFn: async () => {
      const res = await fetch(
        "https://alike-new-server-side.vercel.app/allseller"
      );
      const data = await res.json();
      return data;
    },
  });

  //  handle delete

  const handleDeleteSeller = (seller) => {
    Swal.fire({
      title: `You sure wanna delete ${seller.user}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://alike-new-server-side.vercel.app/allbuyer/${seller?._id}`,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${localStorage.getItem("alikeNewToken")}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Seller has been deleted.", "success");
              refetch();
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  // verify seller

  const handleVerify = (id) => {
    fetch(`https://alike-new-server-side.vercel.app/verifyseller/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("alikeNewToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("seller verified given");
          refetch();
        }
      })
      .catch((error) => console.log(error.message));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
      </div>
    );
  }
  return (
    <div className="mt-8 px-14">
      <h2 className="text-2xl">All Users</h2>
      <div className="overflow-x-auto  rounded-lg mt-6">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Seller Id</th>
              <th>Seller</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sellers?.length &&
              sellers?.map((seller, index) => {
                return (
                  <tr className="hover" key={sellers._id}>
                    <th>{index + 1}</th>
                    <td>{seller._id}</td>
                    <td>{seller.user}</td>
                    <td>{seller.email}</td>

                    <td>
                      {seller?.status === "verified" ? (
                        <TiTickOutline className="text-4xl text-blue-300" />
                      ) : (
                        <button
                          className="btn btn-sm btn-accent"
                          onClick={() => handleVerify(seller?._id)}
                        >
                          Verify
                        </button>
                      )}
                    </td>
                    <td>
                      <FaTrashAlt
                        className="text-3xl text-red-500 cursor-pointer"
                        onClick={() => handleDeleteSeller(seller)}
                      />
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

export default Sellers;
