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


const ModifyMemberPopup = ({ open, handleClose, result, onSave, getToken,pageNumber }) => {

    const [formData, setFormData] = useState({
      name: result.name,
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
        const token=getToken();

        if (!token) {
          setError("Authentication token is missing.");
          setLoading(false);
          return;
        }

            await axios.put(
          `${process.env.REACT_APP_API_URL}/api/v1/member/${result.memberId}/${String(formData.name)}`,{},
          {
            headers:{
              accept:"*/*",
              Authorization:`Bearer ${token}`,
            },
          }
        );
        onSave(pageNumber); // Notify parent to refresh data
        handleClose(); // Close popup
      } catch (err) {
        setError("Failed to update member. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Modify Member</DialogTitle>
        <DialogContent>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <TextField
            label="Name"
            name="name"
            value={formData.name}
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
  
  export default ModifyMemberPopup;