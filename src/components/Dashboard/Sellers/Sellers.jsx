import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";

const Sellers = () => {
  const {
    data: sellers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allseller"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/allseller");
      const data = await res.json();
      return data;
    },
  });

  //  handle delete

  const handleDeleteSeller = (seller) => {
    Swal.fire({
      title: `You sure wanna delete ${seller.name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/doctors/${seller?._id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("AppointmentToken")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
      <h2 className="text-2xl">All Users</h2>
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
            {sellers?.length &&
              sellers?.map((seller, index) => {
                return (
                  <tr className="hover" key={sellers._id}>
                    <th>{index + 1}</th>
                    <td>{seller._id}</td>
                    <td>{seller.user}</td>
                    <td>{seller.email}</td>

                    <td>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDeleteSeller(seller)}
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

export default Sellers;
