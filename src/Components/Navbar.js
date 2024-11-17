import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

const Navbar = () => {
  return (
    <header>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0)",
          boxShadow: "none",
        }}
      >
        <Toolbar className="flex justify-between items-center px-4">
          {/* Logo */}
          <img src="/logo.png" alt="Logo" className="h-20 cursor-pointer" />

          {/* Meniu */}
          <div className="flex space-x-6">
            <Button
              sx={{
                color: "black",
                backgroundColor: "transparent",
                textTransform: "none",
              }}
              className="hover:text-gray-600"
            >
              Acasă
            </Button>
            <Button
              sx={{
                color: "black",
                backgroundColor: "transparent",
                textTransform: "none",
              }}
              className="hover:text-gray-600"
            >
              Despre Noi
            </Button>
            <Button
              sx={{
                color: "black",
                backgroundColor: "transparent",
                textTransform: "none",
              }}
              className="hover:text-gray-600"
            >
              Competiții Organizate
            </Button>
            <Button
              sx={{
                color: "black",
                backgroundColor: "transparent",
                textTransform: "none",
                border: "1px solid black",
              }}
              className="hover:bg-gray-100 px-4 rounded"
            >
              Autentificare
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Navbar;
