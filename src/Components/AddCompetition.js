import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../hooks/useAuth"; // Assuming you have useAuth to get the token

const AddCompetition = () => {
  const { getToken } = useAuth(); // Get the token from the custom hook
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken(); // Get the token from the hook

    if (!token) {
      setError("You must be logged in to add a competition.");
      return;
    }

    setLoading(true);
    setError(null);

    console.log(new Date(endDate).getTime() / 1000);
    console.log(new Date(startDate).getTime() / 1000);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/competition`,
        {
          name,
          location,
          startDate: Math.floor(new Date(startDate).getTime() / 1000),
          endDate: Math.floor(new Date(endDate).getTime() / 1000),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        }
      );

      alert("Competitia a fost adaugata cu succes");
      setName("");
      setLocation("");
      setStartDate("");
      setEndDate("");
      setError("");
    } catch (err) {
      console.error("Error adding competition:", err);
      setError("Failed to add competition. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 3, color: "white" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginBottom: 5,
        }}
      >
        Adauga competite noua
      </Typography>
      {error && (
        <Typography variant="body2" color="white" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Competition Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputLabelProps={{
            shrink: false,
          }}
          sx={{
            marginBottom: 2,
            borderRadius: 1,
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiFormLabel-root": {
              color: "white",
              display: name ? "none" : "block",
            },
            "& .Mui-focused .MuiFormLabel-root": {
              color: "white",
            },
          }}
          required
        />
        <TextField
          label="Locatia"
          variant="outlined"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          InputLabelProps={{
            shrink: false,
          }}
          sx={{
            marginBottom: 2,
            borderRadius: 1,
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiFormLabel-root": {
              color: "white",
              display: location ? "none" : "block",
            },
            "& .Mui-focused .MuiFormLabel-root": {
              color: "white",
            },
          }}
          required
        />
        {/* Start Date with Time */}
        <TextField
          label="Start Date and Time"
          type="datetime-local" // Changes here to support both date and time
          variant="outlined"
          fullWidth
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{
            marginBottom: 2,
            borderRadius: 1,
            "& .MuiInputBase-input": {
              color: "white", // Input text color
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", // Border color
              },
              "&:hover fieldset": {
                borderColor: "white", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Border color when focused
              },
            },
            "& .MuiFormLabel-root": {
              color: "white", // Label color
            },
            "& .Mui-focused .MuiFormLabel-root": {
              color: "white", // Label color when focused
            },
          }}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* End Date with Time */}
        <TextField
          label="End Date and Time"
          type="datetime-local" // Changes here to support both date and time
          variant="outlined"
          fullWidth
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={{
            marginBottom: 2,
            borderRadius: 1,
            "& .MuiInputBase-input": {
              color: "white", // Input text color
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", // Border color
              },
              "&:hover fieldset": {
                borderColor: "white", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Border color when focused
              },
            },
            "& .MuiFormLabel-root": {
              color: "white", // Label color
            },
            "& .Mui-focused .MuiFormLabel-root": {
              color: "white", // Label color when focused
            },
          }}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{
            marginTop: 2,
            backgroundColor: "white", // Initial background color
            color: "darkred", // Initial text color
            "&:hover": {
              backgroundColor: "lightgray", // Set a custom hover background color
            },
            "&:active": {
              backgroundColor: "white", // Keep background white when clicked (active state)
            },
            "&:focus": {
              backgroundColor: "white", // Keep background white when focused
            },
            "&:disabled": {
              backgroundColor: "lightgray", // Optional: change color when button is disabled
              color: "darkred", // Optional: color when disabled
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="white" />
          ) : (
            "Adauga competitia"
          )}
        </Button>
      </form>
    </Box>
  );
};

export default AddCompetition;
