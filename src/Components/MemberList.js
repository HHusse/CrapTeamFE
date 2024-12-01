import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const MemberList = ({ members }) => {
  if (members.length === 0) {
    return <p>Nu există membri în echipă.</p>;
  }

  return (
    <List>
      {members.map((member, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={member.name}
            secondary={`Rol: ${member.role}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default MemberList;
