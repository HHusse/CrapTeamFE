import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const AddArchiveCompetition = () => {
  const { getToken } = useAuth();
  const token = getToken();

  const [name, setName] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [details, setDetails] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/ourteam/members`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMembers(response.data);
      } catch (error) {
        setMessage("Eroare la încărcarea membrilor.");
      }
    };
    fetchMembers();
  }, [token]);

  const handleJoinCompetition = async () => {
    if (!name || !startDate || !endDate || selectedMembers.length === 0) {
      setMessage("Toate câmpurile sunt obligatorii.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/archive/competition`,
        {
          name,
          resultUrl,
          startDate: Math.floor(new Date(startDate).getTime() / 1000),
          endDate: Math.floor(new Date(endDate).getTime() / 1000),
          details,
          memberIds: selectedMembers,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Competiția arhivată a fost creată cu succes!");
      resetForm();
    } catch (error) {
      setMessage("Eroare la crearea competiției.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setResultUrl("");
    setStartDate("");
    setEndDate("");
    setDetails("");
    setSelectedMembers([]);
  };

  const handleMemberSelection = (memberId) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "0 auto 40px",
        padding: 3,
        borderRadius: "8px",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "darkred" }}>
        Adaugă Competiție Arhivată
      </Typography>

      <TextField
        label="Nume Competiție"
        fullWidth
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        required
      />
      <TextField
        label="URL Rezultat"
        fullWidth
        variant="outlined"
        value={resultUrl}
        onChange={(e) => setResultUrl(e.target.value)}
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
      />
      <TextField
        label="Data și Ora de Start"
        type="datetime-local"
        fullWidth
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
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
        required
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Data și Ora de Sfârșit"
        type="datetime-local"
        fullWidth
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
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
        required
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Detalii"
        multiline
        rows={3}
        fullWidth
        variant="outlined"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
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
      />

      <Typography
        variant="h6"
        sx={{ color: "darkred", marginBottom: 2, textAlign: "left" }}
      >
        Selectează Membrii Participanți:
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
        {members.map((member) => (
          <FormControlLabel
            key={member.memberId}
            control={
              <Checkbox
                checked={selectedMembers.includes(member.memberId)}
                onChange={() => handleMemberSelection(member.memberId)}
                sx={{
                  color: "darkred", // Unchecked color
                  "&.Mui-checked": {
                    color: "darkred", // Checked color
                  },
                }}
              />
            }
            label={`${member.name}`}
            sx={{ marginBottom: "8px" }}
          />
        ))}
      </Box>

      <Button
        variant="contained"
        color="success"
        onClick={handleJoinCompetition}
        sx={{
          textTransform: "none",
          fontWeight: "bold",
        }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Adaugă Competiția"}
      </Button>

      {message && (
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            color: message.includes("Eroare") ? "red" : "green",
            marginTop: 2,
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default AddArchiveCompetition;
