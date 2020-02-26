import React from "react";
import "../stylesheets/AppStyle.css";
import { Grid, Segment, Button } from "semantic-ui-react";

export const Home: React.FC = () => {
  return (
    <div className="companylists">
      <Grid columns={2}>
        <Grid.Column width={13}>
          <Segment.Group horizontal>
            <Segment>In Progress</Segment>
            <Segment>Paused</Segment>
            <Segment>Done</Segment>
          </Segment.Group>
        </Grid.Column>
        <Grid.Column width={3}>
          <Button>Create a new company</Button>
        </Grid.Column>
      </Grid>
    </div>
  );
};
