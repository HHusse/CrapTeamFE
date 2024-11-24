import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const AddResultPopup = ({
  open,
  handleClose,
  competitionId,
  onSave,
  getToken,
}) => {
  const [formData, setFormData] = useState({
    teamId: "",
    rank: 0,
    totalWeight: 0,
    fishCount: 0,
  });
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/competition/${competitionId}/teams`
        );
        setTeams(response.data);
      } catch (err) {
        setError("Failed to fetch teams.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchTeams();
    }
  }, [open, competitionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const token = getToken();

      if (!token) {
        setError("Authentication token is missing.");
        setLoading(false);
        return;
      }

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/competition/${competitionId}/result`,
        {
          teamId: formData.teamId,
          rank: Number(formData.rank),
          totalWeight: Number(formData.totalWeight),
          fishCount: Number(formData.fishCount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSave(); // Notify parent to refresh results
      handleClose(); // Close popup
    } catch (err) {
      setError("Failed to add result. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          height: "40vh",
        }}
      >
        <CircularProgress size={24} color="white" />
      </Box>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Result</DialogTitle>
      <DialogContent>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <FormControl fullWidth margin="dense">
          <InputLabel>Team</InputLabel>
          <Select
            label="Team"
            name="teamId"
            value={formData.teamId}
            onChange={handleChange}
          >
            {teams.map((team) => (
              <MenuItem key={team.teamId} value={team.teamId}>
                {team.teamName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Rank"
          name="rank"
          type="number"
          value={formData.rank}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Total Weight"
          name="totalWeight"
          type="number"
          value={formData.totalWeight}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Fish Count"
          name="fishCount"
          type="number"
          value={formData.fishCount}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading || !formData.teamId}
        >
          {loading ? "Saving..." : "Add Result"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddResultPopup;
