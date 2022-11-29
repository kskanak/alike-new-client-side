import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Buyers = () => {
  const {
    data: buyers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allseller"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/allbuyer", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("alikeNewToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  // handle delete
  const handleDeleteBuyer = (buyer) => {
    Swal.fire({
      title: `You sure wanna delete ${buyer.user}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/allbuyer/${buyer?._id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("alikeNewToken")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Buyer has been deleted.", "success");
              refetch();
            }
          })
          .catch((error) => console.log(error));
      }
    });
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
      <h2 className="text-2xl">All Buyers</h2>
      <div className="overflow-x-auto  rounded-lg mt-6">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Seller Id</th>
              <th>Seller</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {buyers?.length &&
              buyers?.map((buyer, index) => {
                return (
                  <tr className="hover" key={buyer._id}>
                    <th>{index + 1}</th>
                    <td>{buyer._id}</td>
                    <td>{buyer.user}</td>
                    <td>{buyer.email}</td>

                    <td>
                      <FaTrashAlt
                        className="text-3xl text-red-500 cursor-pointer"
                        onClick={() => handleDeleteBuyer(buyer)}
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

export default Buyers;
