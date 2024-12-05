import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";

const MemberSelectionModal = ({
  open,
  members,
  selectedMembers,
  onClose,
  onSelectMember,
  onJoinCompetition,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Selectează Membrii</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Alege membrii care vor participa la competiție:
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {members.map((member) => (
            <FormControlLabel
              key={member.memberId}
              control={
                <Checkbox
                  checked={selectedMembers.includes(member.memberId)}
                  onChange={() => onSelectMember(member.memberId)}
                />
              }
              label={`${member.name}`}
              sx={{ marginBottom: "8px" }}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: "red",
            color: "white",
            "&:hover": { backgroundColor: "#d32f2f" },
          }}
        >
          Anulează
        </Button>
        <Button
          onClick={onJoinCompetition}
          sx={{
            backgroundColor: "green",
            color: "white",
            "&:hover": { backgroundColor: "#388e3c" },
          }}
        >
          Înscrie
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemberSelectionModal;
