import React, { FC, useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { Grid } from "semantic-ui-react";

export const Ticket: FC = () => {
  const [loaded, setLoaded] = useState(false);
  const match = useRouteMatch<{ ticketID: string }>("/ticket/:ticketID");
  const ticketID = match?.params.ticketID;
  console.log("this is subject_line ==> ", match?.params.ticketID);

  const getTicket = async () => {
    await fetch(`/selected-ticket/${ticketID}`)
      .then(res => res.json())
      .then(data => console.log("This is res from selected-ticket ==> ", data));
    setLoaded(true);
  };

  useEffect(() => {
    if (!loaded) {
      getTicket();
    }
  }, [ticketID, loaded]);

  if (!loaded) {
    return <p>Loading ticket...</p>;
  }

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
