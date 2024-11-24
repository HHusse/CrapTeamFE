import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/competitions`
        );
        setCompetitions(response.data);
      } catch (error) {
        console.error("Error fetching competitions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          height: "40vh", // Or adjust based on your layout
        }}
      >
        <CircularProgress size={24} color="white" />
      </Box>
    );
  }

  // Function to handle the redirect when clicking the "More Details" button
  const handleMoreDetailsClick = (competitionId) => {
    navigate(`/competition/details/${competitionId}`);
  };

  return (
    <div>
      {/* Title with center alignment */}
      <Typography
        variant="h3"
        component="div"
        color="white"
        gutterBottom
        align="center"
        sx={{ marginBottom: 4 }} // Adds space between the title and the cards
      >
        Competitile organizate de noi
      </Typography>

      {/* Container for the cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {/* Loop through competitions and display each card */}
        {competitions.map((competition) => (
          <Card key={competition.competitionId} sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                {competition.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Locatia: {competition.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Incepe in data de {formatDate(competition.startDate)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Se termina in data de {formatDate(competition.endDate)}
              </Typography>
            </CardContent>
            {/* Red button with redirect on click */}
            <Button
              size="small"
              sx={{
                m: 2,
                backgroundColor: "#972521",
                color: "white",
                "&:hover": {
                  backgroundColor: "darkred",
                },
              }}
              onClick={() => handleMoreDetailsClick(competition.competitionId)}
            >
              More Details
            </Button>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default Competitions;
