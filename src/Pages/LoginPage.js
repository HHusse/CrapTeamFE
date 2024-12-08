import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/login`,
        {
          username,
          password,
        }
      );

      const { token } = response.data;

      localStorage.setItem("authToken", token);

      navigate("/");
    } catch (err) {
      setError("Invalid username or password.");
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
        color: "white",
        padding: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>

      {error && (
        <Typography variant="body2" color="white" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 400 }}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputLabelProps={{
            shrink: false,
          }}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 1,
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
            "& .MuiFormLabel-root": {
              color: "darkred",
              display: username ? "none" : "block",
            },
            "& .Mui-focused .MuiFormLabel-root": {
              color: "darkred",
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            shrink: false,
          }}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 1,
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
            "& .MuiFormLabel-root": {
              color: "darkred",
              display: password ? "none" : "block",
            },
            "& .Mui-focused .MuiFormLabel-root": {
              color: "darkred",
            },
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
          {loading ? <CircularProgress size={24} color="white" /> : "Login"}
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          onClick={handleRegister}
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
          Register
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
