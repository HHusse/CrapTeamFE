import React from "react";
import { Box, Typography } from "@mui/material";
import AddCompetition from "../Components/AddCompetition";
import CompetitionsTable from "../Components/CompetitionsTable";

const Dashboard = () => {
  // If role is ADMIN, render the dashboard content
  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          padding: 2,
        }}
      >
        Panoul de admin
      </Typography>
      <AddCompetition></AddCompetition>
      <CompetitionsTable></CompetitionsTable>
    </Box>
  );
};

export default Dashboard;
