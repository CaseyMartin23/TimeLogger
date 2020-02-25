import React from "react";
import "../stylesheets/AppStyle.css";
import { Card, Grid, Divider, Segment } from "semantic-ui-react";

export const Home: React.FC = () => {
  return (
    <div className="companylists">
      <Segment.Group horizontal>
        <Segment>In Progress</Segment>
        <Segment>Paused</Segment>
        <Segment>Done</Segment>
      </Segment.Group>
    </div>
  );
};
