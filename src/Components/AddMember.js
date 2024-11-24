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

  const token = getToken(); // Obține token-ul din Local Storage

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/team/member`,
        {
          name,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Atașează token-ul
          },
        }
      );
      setMessage("Membrul a fost adăugat cu succes!");
      setName(""); // Resetează formularul
      setRole("");
    } catch (error) {
      setMessage("Eroare la adăugarea membrului.");
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nume:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="role">Rol:</label>
        <input
          type="text"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </div>
      <button type="submit">Adaugă Membru</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddMember;
