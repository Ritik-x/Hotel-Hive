import React from "react";
import Navbar from "./components/Navbar";

import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import MyBooking from "./pages/MyBooking";
import Hotelreg from "./components/Hotelreg";
import Layout from "./pages/hotelowner/Layout";
import Dashboard from "./pages/hotelowner/Dashboard";
import Listroom from "./pages/hotelowner/Listroom";
import AddRoom from "./pages/hotelowner/AddRoom";
const App = () => {
  const isOwnerpath = useLocation().pathname.includes("/owner");
  return (
    <>
      {!isOwnerpath && <Navbar />}

      {false && <Hotelreg />}

      <div className="min-h-[70-vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/mybookings" element={<MyBooking />} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<Listroom />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
