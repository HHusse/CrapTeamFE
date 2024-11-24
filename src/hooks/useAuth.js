export const useAuth = () => {
  const getToken = () => {
    return localStorage.getItem("authToken"); // Return token from localStorage
  };

  return { getToken };
};
