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

const TeamsTable = () => {
  const { getToken } = useAuth(); // Get the token from your custom hook
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch teams data on component mount
    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/teams`,
          {
            headers: {
              accept: "*/*",
            },
          }
        );
        setTeams(response.data); // Save teams data to state
      } catch (err) {
        setError("Failed to fetch teams.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Handle delete team
  const handleDelete = async (teamId) => {
    const token = getToken(); // Get the token

    if (!token) {
      setError("You must be logged in to delete a team.");
      return;
    }

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/team/${teamId}`,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
        }
      );
      // Remove the deleted team from the state
      setTeams(teams.filter((team) => team.teamId !== teamId));
    } catch (err) {
      setError("Failed to delete team.");
      console.error(err);
    }
  };

  // Handle remove logo
  const handleRemoveLogo = async (teamId) => {
    const token = getToken(); // Get the token

    if (!token) {
      setError("You must be logged in to remove a team's logo.");
      return;
    }

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/team/${teamId}/remove-image`,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
        }
      );
      // Update the team state to set logoImage to null
      setTeams(
        teams.map((team) =>
          team.teamId === teamId ? { ...team, logoImage: null } : team
        )
      );
    } catch (err) {
      setError("Failed to remove logo.");
      console.error(err);
    }
  };

  const renderLogo = (logoBytes) => {
    if (!logoBytes) return null;
    const imageUrl = `data:image/png;base64,${logoBytes}`;
    return (
      <img
        src={imageUrl}
        alt="Team Logo"
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
      />
    );
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
        Echipe existente
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
                Logo
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                  color: "white",
                }}
              >
                Team Name
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
            {teams.map((team) => (
              <TableRow key={team.teamId}>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    color: "white",
                  }}
                >
                  {renderLogo(team.logoImage)}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    color: "white",
                  }}
                >
                  {team.teamName}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    color: "white",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(team.teamId)}
                    >
                      Sterge
                    </Button>
                    {team.logoImage && (
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleRemoveLogo(team.teamId)}
                      >
                        Sterge imagine
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeamsTable;
