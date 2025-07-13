import React from "react";
import Title from "./Title";
import { testimonials } from "../assets/assets";
import Starrating from "./Starrating";
const Testimonial = () => {
  return (
    <>
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30">
        <Title
          title="Our Guests Review "
          subTitle="Discover why screaning travelers consistly choose HotelHive for their exclusive and luxurious accomodations around the world"
        />

        <div className="flex flex-wrap items-center justify-center gap-6 mt-20 mb-10">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow max-w-xs"
            >
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.name}
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23e5e7eb'/%3E%3Ccircle cx='24' cy='20' r='8' fill='%23d1d5db'/%3E%3Ctext x='24' y='38' text-anchor='middle' font-family='Arial, sans-serif' font-size='8' fill='%236b7280'%3EUser%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div>
                  <p className="font-playfair text-xl">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                <Starrating rating={testimonial.rating} />
              </div>
              <p className="text-gray-500 max-w-90 mt-4">
                "{testimonial.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Testimonial;
