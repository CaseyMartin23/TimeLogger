import React from "react";
import "semantic-ui-css/semantic.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export const Sidebar: React.FC = () => {
  return (
    <div>
      <List disablePadding dense>
        <ListItem button>
          <ListItemText>Timesheet</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText>Companies</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText>Projects</ListItemText>
        </ListItem>
      </List>
    </div>
  );
};
