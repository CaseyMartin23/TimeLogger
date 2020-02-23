import React, { FC, useState, useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";

type Props = {
  ticketID: number;
  companyID: string | undefined;
};

export const TimerButton: FC<Props> = ({ ticketID, companyID }) => {
  const [loading, setLoading] = useState(false);
  const [ticketState, setTicketState] = useState("Open");

  const startTicketTime = () => {
    console.log("start button clicked !!!");
  };

  const pauseTicketTime = () => {
    console.log("pause button clicked !!!");
  };

  const stopTicketTime = () => {
    console.log("done button clicked !!!");
  };

  if (loading) return <div>Loading ...</div>;

  return (
    <div style={{ padding: "20px", paddingTop: "40px" }}>
      <Button onClick={startTicketTime}>Start</Button>
      <Button onClick={pauseTicketTime}>Pause</Button>
      <Button onClick={stopTicketTime}>Done</Button>
    </div>
  );
};
