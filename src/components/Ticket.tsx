import React, { FC, useEffect } from "react";
import { useRouteMatch } from "react-router";
import { Grid } from "semantic-ui-react";

export const Ticket: FC = () => {
  const match = useRouteMatch<{ ticketID: string }>("/ticket/:ticketID");
  console.log("this is subject_line ==> ", match?.params.ticketID);

  useEffect(() => {
    fetch(`/selected-ticket/${match?.params.ticketID}`)
      .then(res => res.json())
      .then(data => console.log("This is res from selected-ticket ==> ", data));
  });

  return (
    <div className="companylists">
      <Grid columns={2}>
        <Grid.Column>
          <Grid.Row>{}</Grid.Row>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </div>
  );
};
