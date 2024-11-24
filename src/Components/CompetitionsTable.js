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
import { useNavigate } from "react-router-dom"; // For navigation

const CompetitionsTable = () => {
  const { getToken } = useAuth();
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
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
        setCompetitions(response.data);
      } catch (err) {
        setError("Failed to fetch competitions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  const handleDelete = async (competitionId) => {
    const token = getToken();

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
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCompetitions(
        competitions.filter((comp) => comp.competitionId !== competitionId)
      );
    } catch (err) {
      setError("Failed to delete competition.");
      console.error(err);
    }
  };

  const handleResults = (competitionId) => {
    navigate(`/admin/result/${competitionId}`);
  };

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
          height: "40vh",
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
        Competitions List
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
                  {formatDate(competition.startDate)}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    color: "white",
                  }}
                >
                  {formatDate(competition.endDate)}
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
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      marginLeft: 1,
                      backgroundColor: "yellow",
                      color: "black",
                    }}
                    onClick={() => handleResults(competition.competitionId)}
                  >
                    Results
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
