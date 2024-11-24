import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import ModifyResultPopup from "../Components/ModifyResultPopup";
import AddResultPopup from "../Components/AddResultPopup"; // Import the AddResultPopup
import { useAuth } from "../hooks/useAuth";

const ResultsPage = () => {
  const { id_competition } = useParams();
  const [results, setResults] = useState([]);
  const [competition, setCompetition] = useState(null); // State for competition details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [addPopupOpen, setAddPopupOpen] = useState(false); // State for AddResultPopup
  const [selectedResult, setSelectedResult] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchResultsAndCompetition = async () => {
      try {
        // Fetch competition details
        const competitionResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/competition/${id_competition}`
        );
        setCompetition(competitionResponse.data);

        // Fetch results
        const resultsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/competition/${id_competition}/results`
        );
        setResults(resultsResponse.data.sort((a, b) => a.rank - b.rank));
      } catch (err) {
        setError("Failed to fetch competition or results.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResultsAndCompetition();
  }, [id_competition]);

  const refreshResults = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/competition/${id_competition}/results`
      );
      setResults(response.data.sort((a, b) => a.rank - b.rank));
    } catch (err) {
      setError("Failed to fetch competition results.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPopup = (result) => {
    setSelectedResult(result);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedResult(null);
  };

  const handleOpenAddPopup = () => {
    setAddPopupOpen(true);
  };

  const handleCloseAddPopup = () => {
    setAddPopupOpen(false);
  };

  const handleDelete = async (resultId) => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        setError("Authentication token is missing.");
        return;
      }

      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/competition/result/${resultId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // After successful delete, remove the result from the state
      setResults(results.filter((result) => result.resultId !== resultId));
    } catch (err) {
      setError("Failed to delete result. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
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
          height: "40vh",
        }}
      >
        <CircularProgress size={24} color="white" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 3,
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Rezultate competie: {competition?.name || "Loading..."}
      </Typography>

      {error && (
        <Box sx={{ marginBottom: 2, color: "red" }}>
          <p>{error}</p>
        </Box>
      )}

      <Box
        sx={{
          alignSelf: "flex-start",
          marginBottom: results.length > 0 ? 2 : 0,
        }}
      >
        <Button
          variant="contained"
          color="success"
          sx={{
            backgroundColor: "green",
            color: "white",
          }}
          onClick={handleOpenAddPopup} // Open AddResultPopup
        >
          Adauga rezultat
        </Button>
      </Box>

      {results.length > 0 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderBottom: "none", color: "white" }}>
                  Locul
                </TableCell>
                <TableCell sx={{ borderBottom: "none", color: "white" }}>
                  Echipa
                </TableCell>
                <TableCell sx={{ borderBottom: "none", color: "white" }}>
                  Numar de kg
                </TableCell>
                <TableCell sx={{ borderBottom: "none", color: "white" }}>
                  Capturi
                </TableCell>
                <TableCell sx={{ borderBottom: "none", color: "white" }}>
                  Actiuni
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result) => (
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
                  <TableCell sx={{ borderBottom: "none", color: "white" }}>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ marginRight: 1 }}
                      onClick={() => handleDelete(result.resultId)} // Call handleDelete on click
                    >
                      Sterge
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "yellow",
                        color: "black",
                      }}
                      onClick={() => handleOpenPopup(result)}
                    >
                      Modifica
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {popupOpen && selectedResult && (
        <ModifyResultPopup
          open={popupOpen}
          handleClose={handleClosePopup}
          result={selectedResult}
          onSave={refreshResults}
          getToken={getToken}
        />
      )}

      {addPopupOpen && (
        <AddResultPopup
          open={addPopupOpen}
          handleClose={handleCloseAddPopup}
          competitionId={id_competition}
          onSave={refreshResults}
          getToken={getToken}
        />
      )}
    </Box>
  );
};

export default ResultsPage;
