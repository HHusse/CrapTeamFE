import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const ModifyResultPopup = ({ open, handleClose, result, onSave, getToken }) => {
  const [formData, setFormData] = useState({
    rank: result.rank,
    totalWeight: result.totalWeight,
    fishCount: result.fishCount,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const token = getToken(); // Get the token

      if (!token) {
        setError("Authentication token is missing.");
        setLoading(false);
        return;
      }

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/competition/result/${result.resultId}`,
        {
          rank: Number(formData.rank),
          totalWeight: Number(formData.totalWeight),
          fishCount: Number(formData.fishCount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token
          },
        }
      );
      onSave(); // Notify parent to refresh data
      handleClose(); // Close popup
    } catch (err) {
      setError("Failed to update result. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Modify Result</DialogTitle>
      <DialogContent>
        {error && <p style={{ color: "red" }}>{error}</p>}
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
          disabled={loading}
        >
          {loading ? "Saving..." : "Gata"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModifyResultPopup;
