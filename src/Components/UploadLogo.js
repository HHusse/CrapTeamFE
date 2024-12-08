import React, { useState, useEffect, useRef } from "react";
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
  const [logo, setLogo] = useState(null); // File to upload
  const [logoUrl, setLogoUrl] = useState(""); // Blob URL of the current logo
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = getToken();

  const logoUrlRef = useRef(logoUrl);
  logoUrlRef.current = logoUrl;

  // Fetch the current logo when the component loads
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/team/logo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "arraybuffer",
          }
        );

        const blob = new Blob([response.data], { type: "image/png" });
        const imageUrl = URL.createObjectURL(blob);
        setLogoUrl(imageUrl);
      } catch (err) {}
    };

    fetchLogo();

    return () => {
      // Cleanup: Revoke the object URL using the ref
      if (logoUrlRef.current) {
        URL.revokeObjectURL(logoUrlRef.current);
      }
    };
  }, [token]);

  const fetchLogo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/team/logo`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], { type: "image/png" });
      const imageUrl = URL.createObjectURL(blob);
      setLogoUrl(imageUrl);
    } catch (err) {}
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
    setError("");
  };

  // Handle logo upload
  const handleSubmit = async (e) => {
    e.preventDefault();

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
      fetchLogo();
    } catch (err) {
      console.error("Error updating logo:", err);
      setError("Failed to update the logo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle logo deletion
  const handleDeleteLogo = async () => {
    setLoading(true);

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/team/logo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLogoUrl(""); // Clear the displayed logo
      alert("Logo-ul a fost șters cu succes!");
    } catch (err) {
      console.error("Error deleting logo:", err);
      setError("Failed to delete the logo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10vh",
        height: "40vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 3,
          width: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
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
          Administrează Logo-ul Clubului
        </Typography>
        {error && (
          <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}
        {logoUrl && (
          <Box sx={{ marginBottom: 3, textAlign: "center" }}>
            <Typography variant="body1" gutterBottom>
              Logo-ul actual:
            </Typography>
            <img
              src={logoUrl}
              alt="Current Logo"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <Button
              onClick={handleDeleteLogo}
              variant="contained"
              color="error"
              sx={{ marginTop: 2 }}
            >
              Șterge Logo-ul
            </Button>
          </Box>
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
    </Box>
  );
};

export default UpdateLogo;
