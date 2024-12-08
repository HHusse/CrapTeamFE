import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid2,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const ArchiveCompetitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch competitions data
  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/archive/competitions`
        );
        setCompetitions(response.data);
      } catch (err) {
        setError("Failed to fetch competitions.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 5 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        borderRadius: 1,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "darkred", textAlign: "center" }}
      >
        Concursuri arhivate
      </Typography>
      <Grid2 container spacing={5} justifyContent="center" alignItems="center">
        {competitions.length === 0 ? (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", width: "100%" }}
          >
            Nu sunt disponibile competiții arhivate.
          </Typography>
        ) : (
          competitions.map((competition) => (
            <Grid2 item xs={10} sm={6} md={4} key={competition.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  boxShadow: 3,
                  borderRadius: 2,
                  "&:hover": {
                    boxShadow: 6,
                  },
                  transition: "box-shadow 0.3s ease",
                  marginBottom: 2,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", color: "darkred" }}
                  >
                    {competition.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={1}
                    sx={{ fontStyle: "italic" }}
                  >
                    {competition.details || "Nicio descriere."}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    <strong>Start Date:</strong>{" "}
                    {new Date(competition.startDate * 1000).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    <strong>End Date:</strong>{" "}
                    {new Date(competition.endDate * 1000).toLocaleString()}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    size="small"
                    color="primary"
                    component="a"
                    href={competition.resultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      color: "darkred",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    View Results
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          ))
        )}
      </Grid2>
    </Box>
  );
};

export default ArchiveCompetitions;
