import React from "react";
import Hero from "../components/Hero";
import FeaturedDestination from "../components/FeaturedDestination";
import ExclusiveOffers from "../components/ExclusiveOffers";
import Testimonial from "../components/Testimonial";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import RecommandedHotels from "../components/RecommandedHotels.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <RecommandedHotels />

      <FeaturedDestination />
      <ExclusiveOffers />
      <Testimonial />
      <NewsLetter />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
