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
import MemberSelectionModal from "./MemberSelectionModal";

const AvailableCompetitions = () => {
  const { getToken } = useAuth();
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState(null);
  const token = getToken();

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/competition/available`,
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

    fetchCompetitions();
  }, [token]);

  const fetchCompetitions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/competition/available`,
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

  const fetchTeamMembers = async (competitionId) => {
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
      setSelectedCompetitionId(competitionId);
      setIsModalOpen(true);
    } catch (error) {
      setMessage("Eroare la încărcarea membrilor echipei.");
      console.error("Error:", error.response?.data || error.message);
    }
  };

  // Handle the selection of members
  const handleMemberSelect = (memberId) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(memberId)
        ? prevSelected.filter((id) => id !== memberId)
        : [...prevSelected, memberId]
    );
  };

  const handleJoinCompetition = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/competition/join`,
        {
          competitionId: selectedCompetitionId,
          membersId: selectedMembers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Ai adăugat cu succes membrii la competiție!");
      setIsModalOpen(false);
      setSelectedMembers([]);
      fetchCompetitions();
    } catch (error) {
      setMessage("Eroare la înscrierea competiției.");
      console.error("Error:", error.response?.data || error.message);
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
        Competitii Disponibile
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
                        color="success"
                        onClick={() =>
                          fetchTeamMembers(competition.competitionId)
                        }
                        sx={{
                          textTransform: "none",
                          fontWeight: "bold",
                          padding: "8px 16px",
                        }}
                      >
                        Alătură-te
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

      <MemberSelectionModal
        open={isModalOpen}
        members={members}
        selectedMembers={selectedMembers}
        onClose={() => setIsModalOpen(false)}
        onSelectMember={handleMemberSelect}
        onJoinCompetition={handleJoinCompetition}
      />
    </Box>
  );
};

export default AvailableCompetitions;
