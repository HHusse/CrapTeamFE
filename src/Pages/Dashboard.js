import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import AddCompetition from "../Components/AddCompetition";
import CompetitionsTable from "../Components/CompetitionsTable";
import TeamsTable from "../Components/TeamsTable";
import MembersTable from "../Components/MembersTable";
import AddMember from "../Components/AddMember";
import UploadLogo from "../Components/UploadLogo";
import OurMemberList from "../Components/OurMemberList";
import AvailableCompetitions from "../Components/AvailableCompetitions";
import ParticipatingCompetitions from "../Components/ParticipatingCompetitions";
import AddArchiveCompetition from "../Components/AddArchiveCompetition";

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
      <TeamsTable></TeamsTable>
      <MembersTable></MembersTable>

      <Divider
        sx={{
          marginY: 4, // Adds vertical spacing
          backgroundColor: "white", // Line color
          height: 2, // Line thickness
        }}
      />

      <Typography
        variant="h4"
        gutterBottom
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10vh",
          color: "white",
          padding: 2,
        }}
      >
        Panoul Echipei
      </Typography>
      <UploadLogo />
      <AddMember />
      <OurMemberList />
      <AvailableCompetitions />
      <ParticipatingCompetitions />
      <AddArchiveCompetition />
    </Box>
  );
};

export default Dashboard;
