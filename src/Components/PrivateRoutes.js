import React, { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Custom hook for getting token
import { fetchUserRole } from "../utils/fetchUserRole"; // Utility to fetch user role
import LoadingComponent from "./LoadingComponent"; // Loading indicator component

const PrivateRoute = ({ element, requiredRole }) => {
  const { getToken } = useAuth(); // Hook to get token
  const [userRole, setUserRole] = useState(null); // To store user role
  const [isLoading, setIsLoading] = useState(true); // To handle loading state

  // UseRef to keep track of the token across re-renders
  const tokenRef = useRef(getToken());

  useEffect(() => {
    const fetchAndSetUserRole = async () => {
      if (!tokenRef.current) {
        // If no token, we don't need to proceed
        setUserRole(null);
        setIsLoading(false);
        return;
      }

      try {
        // Fetch role using the token
        const role = await fetchUserRole(tokenRef.current);
        setUserRole(role);
      } catch (error) {
        // If there's an error fetching role, set userRole to null
        setUserRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetUserRole();
  }, []); // Runs once when the component mounts

  if (isLoading) {
    return <LoadingComponent />;
  }

  // If requiredRole is "ANY", allow access if user has any role
  if (requiredRole === "ANY") {
    return userRole ? element : <Navigate to="/login" />;
  }

  // Otherwise, check if the user role matches the requiredRole
  return userRole === requiredRole ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
