import React from "react";
import { IoLogoInstagram } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";

import { SiLinkedin } from "react-icons/si";

const Footer = () => {
  return (
    <div className="text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        <div className="max-w-80">
          {/* <img
            src={assets.logo}
            alt="logo"
            className="mb-4 h-8 md:h-10 invert"
          /> */}

          <h1 className=" text-4xl cursor-pointer mb-6 font-black ">
            HOTEL-HIVE
          </h1>

          <p className="text-sm">
            HotelHive is your go-to platform for easy and comfortable hotel
            bookings. Whether you're planning a relaxing getaway or a quick city
            stay, we’ve got you covered.
          </p>
          <div className="flex items-center gap-3 mt-4">
            {/* Instagram */}
            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoInstagram />
            </a>

            {/* github */}
            <a
              href="https://github.com/Ritik-x"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            {/* Twitter */}
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiTwitterXFill />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ritik-garg-604979282/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiLinkedin />
            </a>
          </div>
        </div>

        <div>
          <p className="text-lg text-gray-800">Hotel-Hive</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Explore Hotels</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-lg text-gray-800">SUPPORT</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Safety Information</a>
            </li>
            <li>
              <a href="#">Cancellation Options</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Accessibility</a>
            </li>
          </ul>
        </div>

        <div className="max-w-80">
          <p className="text-lg text-gray-800">STAY UPDATED</p>
          <p className="mt-3 text-sm">
            Get exclusive travel tips, hotel deals, and dreamy destinations —
            straight to your inbox.{" "}
          </p>
          <div className="flex items-center mt-4">
            <input
              type="text"
              className="bg-white rounded-l border border-gray-300 h-9 px-3 outline-none"
              placeholder="Your email"
              required
            />
            <button className="flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r">
              {/* Arrow icon */}
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-300 mt-8" />
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>
          © {new Date().getFullYear()}HotelHive. All rights reserved...{" "}
          <span className="text-blue-600 hover:text-4xl"> By Ritik Garg</span>{" "}
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="#">Sitemap</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
