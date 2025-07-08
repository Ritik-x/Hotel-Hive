import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UserButton } from "@clerk/clerk-react";

const Navigation = () => {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 md:px-8 border-b border-gray-500 bg-white transition-all">
        <Link to="/">
          {" "}
          <img src={assets.logo} alt="logo" className="h-7 invert opacity-80" />
        </Link>

        <UserButton />
      </div>
    </>
  );
};

export default Navigation;
