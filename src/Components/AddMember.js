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

const AddMember = () => {
  const { getToken } = useAuth();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = getToken();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/team/member`,
        {
          name,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Membrul a fost adăugat cu succes!");
      setName("");
      setRole("");
    } catch (error) {
      setMessage("Eroare la adăugarea membrului.");
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto 40px",
        padding: 3,
        borderRadius: "8px",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "darkred",
        }}
      >
        Adaugă Membru
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nume"
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "darkred", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "red", // Hover color
              },
              "&.Mui-focused fieldset": {
                borderColor: "darkred", // Focused border color (green)
              },
            },
            "& .MuiInputBase-input": {
              color: "darkred", // Default text color
            },
            "& .Mui-focused .MuiInputBase-input": {
              color: "darkred", // Change text color on focus (green)
            },
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Rol"
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "darkred", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "red", // Hover color
              },
              "&.Mui-focused fieldset": {
                borderColor: "darkred", // Focused border color (orange)
              },
            },
            "& input": {
              color: "darkred", // Default text color
            },
            "& .Mui-focused .MuiInputBase-input": {
              color: "darkred",
            },
          }}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            padding: 1,
            color: "white",
            backgroundColor: "darkred",
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "darkred" }} />
          ) : (
            "Adaugă Membru"
          )}
        </Button>
      </form>
      {message && (
        <Typography
          variant="body2"
          sx={{
            marginTop: 2,
            fontWeight: "bold",
            color: message.includes("Eroare") ? "red" : "green",
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default AddMember;
