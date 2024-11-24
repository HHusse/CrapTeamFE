import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
import axios from "axios";
import {
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";

const CompetitionDetails = () => {
  const { id } = useParams(); // Get the competition ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate to redirect if necessary
  const [competition, setCompetition] = useState(null);
  const [teams, setTeams] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCompetitionDetails = async () => {
      try {
        // Fetch competition details
        const competitionResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/competition/${id}`
        );
        setCompetition(competitionResponse.data);

        // Fetch teams participating in the competition
        const teamsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/competition/${id}/teams`
        );
        setTeams(teamsResponse.data);

        // Fetch competition results
        const resultsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/competition/${id}/results`
        );
        setResults(resultsResponse.data);
      } catch (error) {
        console.error("Error fetching competition or teams:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitionDetails();
  }, [id]);

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

  if (error || !competition) {
    navigate("/", { replace: true });
    return null;
  }

  const sortedResults = results.sort((a, b) => a.rank - b.rank);

  return (
    <div
      style={{
        backgroundColor: "transparent",
        color: "white",
        minHeight: "100vh",
        marginTop: 70,
      }}
    >
      <Typography
        variant="h3"
        component="div"
        gutterBottom
        align="center"
        sx={{ marginBottom: 4 }}
      >
        {competition.name}
      </Typography>

      <Card
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          marginBottom: 10,
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ color: "white" }}>
            Locatie: {competition.location}
          </Typography>
          <Typography variant="body1" sx={{ color: "white" }}>
            Incepe in data de {formatDate(competition.startDate)}
          </Typography>
          <Typography variant="body1" sx={{ color: "white" }}>
            Se termina in data de {formatDate(competition.endDate)}
          </Typography>
        </CardContent>
      </Card>

      <Typography
        variant="h5"
        component="div"
        gutterBottom
        align="center"
        sx={{ marginBottom: 2 }}
      >
        Echipele Participante
      </Typography>

      <Box sx={{ maxWidth: 800, margin: "0 auto" }}>
        {teams.length > 0 ? (
          <List>
            {teams.map((team) => (
              <Card
                key={team.teamId}
                sx={{
                  marginBottom: 2,
                  backgroundColor: "transparent",
                  boxShadow: "none",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: "white" }}>
                    Echipa: {team.teamName}
                  </Typography>
                  <List>
                    {team.members.map((member) => (
                      <ListItem key={member.memberId} sx={{ color: "white" }}>
                        {member.name}
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}
          </List>
        ) : (
          <Typography
            variant="body1"
            align="center"
            sx={{ color: "white", marginBottom: "20vh" }}
          >
            Indisponibil
          </Typography>
        )}
      </Box>

      {/* Display Results Table */}
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        align="center"
        sx={{ marginBottom: 2 }}
      >
        Rezultate
      </Typography>

      <Box sx={{ maxWidth: 800, margin: "0 auto", marginBottom: 10 }}>
        {results.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    color: "white",
                  }}
                >
                  Locul
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    color: "white",
                  }}
                >
                  Echipa
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    color: "white",
                  }}
                >
                  Numar kg
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    color: "white",
                  }}
                >
                  Capturi
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedResults.map((result) => (
                <TableRow key={result.resultId}>
                  <TableCell sx={{ borderBottom: "none", color: "white" }}>
                    {result.rank}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none", color: "white" }}>
                    {result.teamName}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none", color: "white" }}>
                    {result.totalWeight}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none", color: "white" }}>
                    {result.fishCount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography
            variant="body1"
            align="center"
            sx={{ color: "white", marginBottom: "20vh" }}
          >
            Indisponibil
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default CompetitionDetails;
