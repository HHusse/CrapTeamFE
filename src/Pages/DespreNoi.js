import React from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

const members = [
  {
    name: "Doru Bodea",
    role: "Președinte",
    photo: "/images/doru.jpg",
    description: ".",
  },
  {
    name: "Doru Bodea",
    role: " Președinte",
    photo: "/images/doru.jpg",
    description: ".",
  },
  {
    name: "Doru Bodea",
    role: " Președinte",
    photo: "/images/doru.jpg",
    description: ".",
  },
];

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
        Crap Team Timișoara este o echipă de pescari pasionați din vestul României, 
        dedicați pescuitului la crap și promovării unui stil de pescuit sustenabil. 
        Ne ghidăm după principiul catch and release, considerând că fiecare captură reprezintă atât un trofeu, cât și un angajament față de protejarea ecosistemelor acvatice.
      </Typography>

      {/* Members Section */}
      <Typography variant="h4" textAlign="center" gutterBottom>
        Echipa Noastră
      </Typography>
      <Grid container spacing={4}>
        {members.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
              <CardMedia
                component="img"
                height="200"
                image={member.photo}
                alt={member.name}
              />
              <CardContent>
                <Typography variant="h5" textAlign="center" gutterBottom>
                  {member.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  gutterBottom
                  sx={{ color: "gray" }}
                >
                  {member.role}
                </Typography>
                <Typography variant="body2" textAlign="center">
                  {member.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default DespreNoi;
 