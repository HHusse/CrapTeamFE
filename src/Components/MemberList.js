import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, List, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const MemberList = () => {
  const { getToken } = useAuth(); 
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = getToken();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/team/members`,
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
        `${process.env.REACT_APP_API_URL}/api/v1/team/member/{id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      setMembers((prevMembers) => prevMembers.filter((member) => member.id !== memberId));
      alert("Member deleted successfully!");
    } catch (err) {
      console.error("Error deleting member:", err);
      alert("Failed to delete the member. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 3,
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Fundal semi-transparent
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "darkred" }}>
        Lista Membrilor Echipei
      </Typography>

      {loading ? (
        <CircularProgress sx={{ color: "darkred" }} />
      ) : error ? (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      ) : (
        <List sx={{ width: "100%", maxWidth: "600px" }}>
          {members.map((member) => (
            <ListItem
              key={member.id}
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
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {member.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  {member.role}
                </Typography>
              </Box>
              <IconButton
                onClick={() => handleDeleteMember(member.id)}
                sx={{ color: "darkred" }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default MemberList;
