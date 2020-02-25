import React, { FC, useState, useEffect } from "react";
import { Button } from "semantic-ui-react";

type Props = {
  clicked: boolean;
  setClicked(value: boolean): void;
  ticketState: string;
  ticketID: number;
  companyID: string | undefined;
};

export const TimerButton: FC<Props> = ({
  ticketID,
  companyID,
  ticketState,
  clicked,
  setClicked
}) => {
  const [ticketTimes, setTicketTimes] = useState();

  const getTicketTimes = async () => {
    await fetch(`/get-ticket-times/${ticketID}`)
      .then(res => res.json())
      .then(data => setTicketTimes(data));
  };

  const startTimer = async () => {
    setClicked(false);
    if (ticketState === "Completed" || ticketState === "In Progress") return;
    if (ticketTimes.length > 0) {
      await fetch(`/start-ticket-timer`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ticket_id: ticketID,
          timerState: "In Progress"
        })
      });
    } else if (ticketTimes) {
      await fetch(`/start-ticket-timer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ticket_id: ticketID,
          timerState: "In Progress"
        })
      });
    }
    setClicked(true);
  };

  const pauseTimer = async () => {
    setClicked(false);
    if (
      ticketState === "Completed" ||
      ticketState === "Paused" ||
      ticketState === "Open"
    )
      return;
    await fetch("/pause-ticket-timer", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ticket_id: ticketID,
        timerState: "Paused"
      })
    });
    setClicked(true);
  };

  const stopTimer = async () => {
    setClicked(false);
    if (ticketState === "Completed" || ticketState === "Open") return;

    await fetch("/stop-ticket-timer", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ticket_id: ticketID,
        timerState: "Completed"
      })
    });
    setClicked(true);
  };

  useEffect(() => {
    getTicketTimes();
  }, [clicked]);

  console.log("ticketTimes ===> ", ticketTimes);

  return (
    <div style={{ padding: "20px", paddingTop: "40px" }}>
      <Button onClick={startTimer}>Start</Button>
      <Button onClick={pauseTimer}>Pause</Button>
      <Button onClick={stopTimer}>Done</Button>
    </div>
  );
};
