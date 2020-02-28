import React, { FC, useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { Grid, Segment } from "semantic-ui-react";
import { TimerButton } from "./TimerButton";

export const Ticket: FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [ticketInfo, setTicketInfo] = useState();

  const match = useRouteMatch<{ ticketID: string }>("/ticket/:ticketID");

  const ticketID = match?.params.ticketID;
  console.log("this is subject_line ==> ", match?.params.ticketID);

  const getTicket = async () => {
    setLoaded(false);
    await fetch(`/selected-ticket/${ticketID}`)
      .then(res => res.json())
      .then(data => setTicketInfo(data));
    setLoaded(true);
  };

  console.log("ticketInfo ==> ", ticketInfo);

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
      {(ticketInfo || []).map(
        (ticket: {
          ticket_id: number;
          user_id: number;
          company_id: number;
          project_id: number;
          subject_line: string;
          description: string;
          ticket_state: string;
          ticket_time: number;
          date_create: string;
        }) => (
          <Segment.Group columns={2} key={ticket.ticket_id}>
            <Segment>
              <p>
                #<i>{ticket.ticket_id}</i>
              </p>
            </Segment>
            <Segment>{ticket.subject_line}</Segment>
            <Segment>{ticket.description}</Segment>
          </Segment.Group>
        )
      )}
    </div>
  );
};
