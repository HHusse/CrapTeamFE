import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const ParticipatingCompetitions = () => {
  const { getToken } = useAuth();
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const token = getToken();

  // Fetch the participating competitions when the component is mounted
  useEffect(() => {
    const fetchParticipatingCompetitions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/competition/participating`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCompetitions(response.data);
        setLoading(false);
      } catch (error) {
        setMessage("Eroare la încărcarea competițiilor.");
        setLoading(false);
        console.error("Error:", error.response?.data || error.message);
      }
    };

    fetchParticipatingCompetitions();
  }, [token]);

  const fetchParticipatingCompetitions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/competition/participating`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCompetitions(response.data);
      setLoading(false);
    } catch (error) {
      setMessage("Eroare la încărcarea competițiilor.");
      setLoading(false);
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const handleLeaveCompetition = async (competitionId) => {
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/competition/leave/${competitionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Ai părăsit competiția cu succes.");
      setCompetitions(
        competitions.filter((comp) => comp.CompetitionId !== competitionId)
      );
      fetchParticipatingCompetitions();
    } catch (error) {
      setMessage("Eroare la părăsirea competiției.");
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "0 auto 40px",
        padding: 3,
        borderRadius: "8px",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "darkred",
        }}
      >
        Competitii în care Participați
      </Typography>
      {loading ? (
        <CircularProgress size={50} sx={{ color: "darkred" }} />
      ) : (
        <>
          <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Competitie</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Locație</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Acțiune</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {competitions.map((competition) => (
                  <TableRow key={competition.competitionId}>
                    <TableCell>{competition.name}</TableCell>
                    <TableCell>{competition.location}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          handleLeaveCompetition(competition.competitionId)
                        }
                        sx={{
                          textTransform: "none",
                          fontWeight: "bold",
                          padding: "8px 16px",
                        }}
                      >
                        Părăsește
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {message && (
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: message.includes("Eroare") ? "red" : "green",
              }}
            >
              {message}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default ParticipatingCompetitions;
