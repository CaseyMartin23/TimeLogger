import React from "react";
import "semantic-ui-css/semantic.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "../assets/stylesheet.css";
import { Icon } from "semantic-ui-react";

export const Sidebar: React.FC = () => {
  return (
    <div>
      <List disablePadding dense className="side">
        <ListItem button>
          <Icon name="calendar alternate outline" size="small" />
          <ListItemText>Timesheet</ListItemText>
        </ListItem>
        <ListItem button>
          <Icon name="suitcase" size="small" />
          <ListItemText>Companies</ListItemText>
        </ListItem>
        <ListItem button>
          <Icon name="clipboard outline" size="small" />
          <ListItemText>Projects</ListItemText>
        </ListItem>
        <ListItem button>
          <Icon name="ticket" size="small" />
          <ListItemText>Tickets</ListItemText>
        </ListItem>
      </List>
    </div>
  );
};
