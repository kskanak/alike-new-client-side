import React from "react";
import { Link } from "react-router-dom";

const CatagorieCard = ({ catagori }) => {
  const { id, name, icon, bgClass } = catagori;
  return (
    <div>
      <Link to={`/catagory/${id}`}>
        <div
          className={` shadow-xl h-56 flex items-center justify-center md:justify-start px-6 rounded-lg mb-6 md:mb-0 ${bgClass}`}
        >
          <div className="card-icon flex justify-center py-6">
            {/* <AiOutlineClockCircle className="text-7xl text-white" /> */}
            <img src={icon} alt="" className="h-56 w-96" />
          </div>
          <div className="pl-6 text-white">
            <h2 className="card-title">{name}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CatagorieCard;
