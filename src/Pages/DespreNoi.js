import React from "react";
import { Box, Typography } from "@mui/material";
import TeamMemberCards from "../Components/TeamMemberCards";

function DespreNoi() {
  return (
    <Box
      sx={{
        padding: "2rem",
        minHeight: "calc(100vh - 60px)", // Adjust for Navbar height
      }}
    >
      {/* Introduction Section */}
      <Typography variant="h3" textAlign="center" gutterBottom>
        Despre Noi
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        sx={{ marginBottom: "2rem", maxWidth: "800px", marginX: "auto" }}
      >
        Crap Team Timișoara este o echipă de pescari pasionați din vestul
        României, dedicați pescuitului la crap și promovării unui stil de
        pescuit sustenabil. Ne ghidăm după principiul catch and release,
        considerând că fiecare captură reprezintă atât un trofeu, cât și un
        angajament față de protejarea ecosistemelor acvatice.
      </Typography>

      <TeamMemberCards />
    </Box>
  );
}

export default DespreNoi;
