import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const UpdateLogo = () => {
  const { getToken } = useAuth();
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();

    if (!token) {
      setError("You must be logged in to update the team logo.");
      return;
    }

    if (!logo) {
      setError("Please select a logo file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", logo);

    setLoading(true);
    setError(null);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/team/upload-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Logo-ul a fost actualizat cu succes!");
      setLogo(null);
      setError("");
    } catch (err) {
      console.error("Error updating logo:", err);
      setError("Failed to update the logo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <Box
        sx={{
          width: "400px",
          padding: 3,
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Fundal semi-transparent
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            marginBottom: 3,
            color: "darkred",
            textAlign: "center",
          }}
        >
          Setează Logo-ul Clubului
        </Typography>
        {error && (
          <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            type="file"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              marginBottom: 2,
              "& .MuiInputBase-input": {
                color: "darkred",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "darkred",
                },
                "&:hover fieldset": {
                  borderColor: "darkred",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "darkred",
                },
              },
            }}
            onChange={handleFileChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: "darkred",
              color: "white",
              "&:hover": {
                backgroundColor: "darkred",
              },
              "&:disabled": {
                backgroundColor: "lightgray",
                color: "darkred",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Actualizează Logo-ul"
            )}
          </Button>
        </form>
      </Box>
  
  );
};

export default UpdateLogo;
