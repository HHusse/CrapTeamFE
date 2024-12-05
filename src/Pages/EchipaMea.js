import React from "react";
import { Box, Typography } from "@mui/material";
import AddMember from "../Components/AddMember";
import UploadLogo from "../Components/UploadLogo";
import MemberList from "../Components/MemberList";
import AvailableCompetitions from "../Components/AvailableCompetitions";
import ParticipatingCompetitions from "../Components/ParticipatingCompetitions";

const DashboardTeam = () => {
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
          marginBottom: "10vh",
          color: "white",
          padding: 2,
        }}
      >
        Panoul Echipei
      </Typography>
      <UploadLogo />
      <AddMember />
      <MemberList />
      <AvailableCompetitions />
      <ParticipatingCompetitions />
    </Box>
  );
};

export default DashboardTeam;
