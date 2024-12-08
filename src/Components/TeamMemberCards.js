import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid2,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import axios from "axios";

const TeamMemberCards = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMembers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/ourteam/members`
      );
      setMembers(response.data);
    } catch (err) {
      console.error("Error fetching members:", err);
      setError("Failed to load team members. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        marginBottom: "10vh",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "darkred" }}>
        Echipa Noastră
      </Typography>

      {loading ? (
        <CircularProgress sx={{ color: "darkred" }} />
      ) : error ? (
        <Typography variant="body2" sx={{ color: "darkred" }}>
          Niciun membru prezent
        </Typography>
      ) : (
        <Grid2 container spacing={3} justifyContent="center">
          {members.map((member) => (
            <Grid2 item key={member.memberId} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  maxWidth: 345,
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                {member.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={`data:image/png;base64,${member.image}`}
                    alt={`${member.name}'s profile`}
                    sx={{ objectFit: "cover" }}
                  />
                )}
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                  >
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
};

export default TeamMemberCards;
