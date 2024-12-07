import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useAuth } from "../hooks/useAuth";
import { fetchUserRole } from "../utils/fetchUserRole";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { getToken } = useAuth(); // Use the custom hook to get token
  const [role, setRole] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchRole = async () => {
      const token = getToken();
      if (token) {
        const userRole = await fetchUserRole(token);
        setRole(userRole);
      } else {
        setRole("");
      }
    };

    fetchRole();
  }, [getToken]);

  // Function to handle navigation to the passed path
  const handleRedicrectClick = (where) => {
    navigate(where); // Navigate to the path provided
  };

  const logOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

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
          <img
            src="/logo.png"
            alt="Logo"
            className="h-20 cursor-pointer"
            onClick={() => handleRedicrectClick("/")}
          />

          {/* Menu */}
          <div className="flex space-x-6">
            <Button
              sx={{
                color: "white",
                backgroundColor: "transparent",
                textTransform: "none",
              }}
              className="hover:text-gray-400"
              onClick={() => handleRedicrectClick("/")}
            >
              Acasă
            </Button>
            <Button
              sx={{
                color: "white",
                backgroundColor: "transparent",
                textTransform: "none",
              }}
              className="hover:text-gray-400"
              onClick={() => handleRedicrectClick("/competitions")} // Corrected to use arrow function
            >
              Competiții Organizate
            </Button>

            {/* Conditionally render the "Panoul de admin" button for ADMIN role */}
            {role === "ADMIN" && (
              <>
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: "transparent",
                    textTransform: "none",
                    border: "1px solid white",
                  }}
                  className="hover:text-gray-400 px-4 rounded"
                  onClick={() => handleRedicrectClick("/admin")} // Corrected to use arrow function
                >
                  Panoul de admin
                </Button>
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: "transparent",
                    textTransform: "none",
                    border: "1px solid red",
                  }}
                  className="hover:text-gray-400 px-4 rounded"
                  onClick={() => logOut()}
                >
                  Deconectare
                </Button>
              </>
            )}

            {/* Conditionally render the "Echipa Mea" button for TEAM role */}
            {role === "TEAM" && (
              <>
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: "transparent",
                    textTransform: "none",
                    border: "1px solid white",
                  }}
                  className="hover:text-gray-400 px-4 rounded"
                  onClick={() => handleRedicrectClick("/echipa-mea")}
                >
                  Echipa Mea
                </Button>
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: "transparent",
                    textTransform: "none",
                    border: "1px solid red",
                  }}
                  className="hover:text-gray-400 px-4 rounded"
                  onClick={() => logOut()}
                >
                  Deconectare
                </Button>
              </>
            )}

            {role === "" && (
              <Button
                sx={{
                  color: "white",
                  backgroundColor: "transparent",
                  textTransform: "none",
                  border: "1px solid black",
                }}
                className="hover:text-gray-400 px-4 rounded"
                onClick={() => handleRedicrectClick("/login")}
              >
                Autentificare
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Navbar;
