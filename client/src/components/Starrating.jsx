import React from "react";
import { assets } from "../assets/assets";

const Starrating = ({ rating = 0 }) => {
  return (
    <>
      {Array(5)
        .fill("")
        .map((_, index) => (
          <img
            key={index}
            src={
              rating > index ? assets.starIconFilled : assets.starIconOutlined
            }
            alt=""
            className="w-4.5 h-4.5"
          />
        ))}
    </>
  );
};

export default Starrating;
