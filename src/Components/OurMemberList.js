import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import UploadIcon from "@mui/icons-material/Upload";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const OurMemberList = () => {
  const { getToken } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const token = getToken();

  const fetchMembers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/ourteam/members`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMembers(response.data);
    } catch (err) {
      console.error("Error fetching members:", err);
      setError("Failed to fetch team members. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/ourteam/members`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMembers(response.data);
      } catch (err) {
        console.error("Error fetching members:", err);
        setError("Failed to fetch team members. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, [token]);

  const handleDeleteMember = async (memberId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/team/member/${memberId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.memberId !== memberId)
      );
      alert("Member deleted successfully!");
    } catch (err) {
      console.error("Error deleting member:", err);
      alert("Failed to delete the member. Please try again.");
    }
  };

  const handleUploadDialogOpen = (member) => {
    setSelectedMember(member);
    setUploadDialogOpen(true);
  };

  const handleUploadDialogClose = () => {
    setSelectedMember(null);
    setImageFile(null);
    setUploadDialogOpen(false);
  };

  const handleImageUpload = async () => {
    if (!imageFile || !selectedMember) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/ourteam/member/${selectedMember.memberId}/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Image uploaded successfully!");
      handleUploadDialogClose();
      fetchMembers(); // Refresh the list to show the updated image.
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload the image. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: "10vh",
        padding: 3,
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "darkred" }}>
        Lista Membrilor Echipei
      </Typography>

      <Button
        variant="outlined"
        onClick={fetchMembers}
        sx={{
          marginBottom: 2,
          color: "darkred",
          borderColor: "darkred",
          "&:hover": {
            borderColor: "darkred",
            backgroundColor: "rgba(139, 0, 0, 0.1)",
          },
        }}
        startIcon={<RefreshIcon />}
      >
        Reload Members
      </Button>

      {loading ? (
        <CircularProgress sx={{ color: "darkred" }} />
      ) : error ? (
        <Typography variant="body2">Nu exista niciun membru</Typography>
      ) : (
        <List sx={{ width: "100%", maxWidth: "600px" }}>
          {members.map((member) => (
            <ListItem
              key={member.memberId}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                marginBottom: 1,
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
            >
              {/* Member Details - Positioned to the Left */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "auto",
                }}
              >
                {member.image && (
                  <img
                    src={`data:image/png;base64,${member.image}`}
                    alt={`${member.name}'s profile`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginRight: "15px",
                    }}
                  />
                )}
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    {member.role}
                  </Typography>
                </Box>
              </Box>

              {/* Action Buttons - Positioned to the Right */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "auto",
                }}
              >
                <IconButton
                  onClick={() => handleUploadDialogOpen(member)}
                  sx={{ color: "darkred" }}
                >
                  <UploadIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteMember(member.memberId)}
                  sx={{ color: "darkred" }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      )}

      {/* Upload Image Dialog */}
      <Dialog open={uploadDialogOpen} onClose={handleUploadDialogClose}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <input type="file" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUploadDialogClose} sx={{ color: "red" }}>
            Cancel
          </Button>
          <Button onClick={handleImageUpload} sx={{ color: "green" }}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OurMemberList;
