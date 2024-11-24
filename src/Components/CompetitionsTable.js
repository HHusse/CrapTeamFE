import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../hooks/useAuth"; // Assuming you have a custom hook to get the token

const CompetitionsTable = () => {
  const { getToken } = useAuth(); // Get the token from your custom hook
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch competitions data on component mount
    const fetchCompetitions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/competitions`,
          {
            headers: {
              accept: "*/*",
            },
          }
        );
        setCompetitions(response.data); // Save competitions data to state
      } catch (err) {
        setError("Failed to fetch competitions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  // Handle delete competition
  const handleDelete = async (competitionId) => {
    const token = getToken(); // Get the token

    if (!token) {
      setError("You must be logged in to delete a competition.");
      return;
    }

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/competition/${competitionId}`,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
        }
      );
      // Remove the deleted competition from the state
      setCompetitions(
        competitions.filter((comp) => comp.competitionId !== competitionId)
      );
    } catch (err) {
      setError("Failed to delete competition.");
      console.error(err);
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
          height: "40vh", // Or adjust based on your layout
        }}
      >
        <CircularProgress size={24} color="white" />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, color: "white" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginBottom: 5,
        }}
      >
        Competitile existente
      </Typography>
      {error && (
        <Box sx={{ marginBottom: 2, color: "red" }}>
          <p>{error}</p>
        </Box>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  borderBottom: "none",
                  color: "white",
                }}
              >
                Competition Name
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                  color: "white",
                }}
              >
                Location
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                  color: "white",
                }}
              >
                Start Date
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                  color: "white",
                }}
              >
                End Date
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                  color: "white",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {competitions.map((competition) => (
              <TableRow key={competition.competitionId}>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    color: "white",
                  }}
                >
                  {competition.name}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    color: "white",
                  }}
                >
                  {competition.location}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    color: "white",
                  }}
                >
                  {new Date(competition.startDate).toLocaleString()}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    color: "white",
                  }}
                >
                  {new Date(competition.endDate).toLocaleString()}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    color: "white",
                  }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(competition.competitionId)}
                  >
                    Sterge
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CompetitionsTable;
