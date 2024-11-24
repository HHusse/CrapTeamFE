import React, { useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import UploadLogo from "../Components/UploadLogo";
import AddMember from "../Components/AddMember";
import MemberList from "../Components/MemberList";

const DashboardTeam = () => {
  const [team, setTeam] = useState({
    logo: "", // URL-ul logo-ului echipei
    members: [], // Lista membrilor echipei
  });

  // Funcție pentru actualizarea logo-ului echipei
  const handleLogoUpload = (logoUrl) => {
    setTeam((prevTeam) => ({
      ...prevTeam,
      logo: logoUrl, // Actualizează URL-ul logo-ului
    }));
  };

  // Funcție pentru adăugarea unui membru
  const handleMemberAdd = (member) => {
    setTeam((prevTeam) => ({
      ...prevTeam,
      members: [...prevTeam.members, member], // Adaugă membrul în listă
    }));
  };

  // Funcție pentru ștergerea unui membru
  const handleMemberDelete = (index) => {
    setTeam((prevTeam) => ({
      ...prevTeam,
      members: prevTeam.members.filter((_, i) => i !== index), // Elimină membrul selectat
    }));
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Titlu */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "#333",
          paddingBottom: 2,
        }}
      >
        Dashboard Echipa Mea
      </Typography>

      {/* Afișare Logo */}
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 2,
          marginBottom: 3,
        }}
      >
        <UploadLogo onUpload={handleLogoUpload} />
      </Card>

      {/* Membrii Echipei */}
      <Card sx={{ padding: 2, marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6">Membrii Echipei</Typography>
          <MemberList
            members={team.members}
            onDelete={handleMemberDelete} // Trimite funcția de ștergere către lista de membri
          />
          <AddMember onAdd={handleMemberAdd} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardTeam;
