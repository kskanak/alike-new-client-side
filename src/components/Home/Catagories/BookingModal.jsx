import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";

const BookingModal = ({ item }) => {
  const { user } = useContext(AuthContext);

  const {
    condition,
    img,
    location,
    original_price,
    post_time,
    product_name,
    sell_price,
    seller_name,
    years_used,
  } = item;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const phone = form.phoneNumber.value;
    const email = form.email.value;
    const meeting_location = form.meetingLocation.value;
    const booking = {
      buyerName: user?.displayName,
      email,
      img,
      phone,
      product_name,
      sell_price,
      meeting_location,
    };

    fetch("https://alike-new-server-side.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          console.log(data);
          toast.success("Booking Confirmed");
          form.reset();
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <div>
      <>
        <input type="checkbox" id="Booking-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <h2 className="font-semibold text-2xl">Booking Form</h2>

            <label
              htmlFor="Booking-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>

            {/* booking form */}

            <div className="hero mt-11">
              <form onSubmit={handleBookingSubmit}>
                <input
                  type="text"
                  placeholder
                  defaultValue={user?.displayName}
                  readOnly
                  className="input input-bordered w-full mb-6 bg-gray-300 text-gray-900 placeholder-custom-slate text-lg font-semibold"
                />
                <input
                  type="email"
                  name="email"
                  readOnly
                  defaultValue={user?.email}
                  className="input input-bordered  w-full mb-6 text-gray-900 font-semibold placeholder-custom-slate bg-gray-300"
                />
                <input
                  type="text"
                  placeholder
                  defaultValue={product_name}
                  readOnly
                  className="input input-bordered w-full mb-6 bg-gray-300 text-gray-900 placeholder-custom-slate text-lg font-semibold"
                />
                <input
                  type="text"
                  placeholder
                  defaultValue={sell_price}
                  readOnly
                  className="input input-bordered w-full mb-6 bg-gray-300 text-gray-900 placeholder-custom-slate text-lg font-semibold"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  required
                  className="input input-bordered  w-full mb-6 text-gray-900 font-semibold"
                />
                <input
                  type="text"
                  placeholder="meeting Location"
                  name="meetingLocation"
                  required
                  className="input input-bordered  w-full mb-6 text-gray-900 font-semibold"
                />

                <button className="w-full ">
                  <label htmlFor="Booking-modal" className="btn w-full">
                    Submit
                  </label>
                </button>
              </form>
            </div>

            {/* booking form */}
          </div>
        </div>
      </>
    </div>
  );
};

export default BookingModal;
