import axios from "axios";

export const fetchUserRole = async (token) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/role`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.role; // Assuming the response contains the "role" field
  } catch (error) {
    console.error("Error fetching role:", error);
    return null; // If there's an error, return null
  }
};
