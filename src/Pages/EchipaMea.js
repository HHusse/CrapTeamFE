import React from "react";
import { Box, Typography } from "@mui/material";
import AddMember from "../Components/AddMember";
import UploadLogo from "../Components/UploadLogo";
import MemberList from "../Components/MemberList";

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
          color: "white",
          padding: 2,
        }}
      >
        Panoul Echipei
      </Typography>
      <UploadLogo />
      <AddMember />
      <MemberList />
    </Box>
  );
};

export default DashboardTeam;
