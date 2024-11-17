import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar will be at the top */}
      <Navbar />
      {/* Main content area */}
      <main className="flex-grow mt-10">{children}</main>{" "}
      {/* This will grow to fill the remaining space */}
      {/* Footer will stay at the bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
