import { useQuery } from "@tanstack/react-query";
import React from "react";
import AdvertiseProductCard from "./AdvertiseProductCard";

const AdvertiseProducts = () => {
  const {
    data: advertiseProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      const res = await fetch("https://alike-new-server-side.vercel.app/advertise", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("alikeNewToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    <div className="flex items-center justify-center h-96">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
    </div>;
  }

  return (
    <>
      {advertiseProducts.length > 0 && (
        <div className="my-10">
          <h2 className="text-3xl font-semibold text-center my-4">
            Product Advertisement
          </h2>
          <div className="catagories grid lg:grid-cols-3 md:grid-cols-2 gap-6 mx-5">
            {advertiseProducts?.map((product) => (
              <AdvertiseProductCard
                key={product._id}
                product={product}
              ></AdvertiseProductCard>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AdvertiseProducts;
