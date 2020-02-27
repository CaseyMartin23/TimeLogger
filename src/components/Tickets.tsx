import React, { useState, useEffect } from "react";
import { Grid, Segment, Card } from "semantic-ui-react";

export const Tickets: React.FC = () => {
  const [allUserTickets, setAllUserTickets] = useState();

  const getAllUserTickets = async () => {
    await fetch("/all-user-tickets")
      .then(res => res.json())
      .then(data => setAllUserTickets(data));
  };

  console.log("allUserTickets ===> ", allUserTickets);

  useEffect(() => {
    getAllUserTickets();
  }, []);

  return (
    <div className="companylists">
      <h3>All your tickets you've created:</h3>
      <Segment>
        <Grid>
          {(allUserTickets || []).length > 0
            ? (allUserTickets || []).map(
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
                  <Grid.Column width={4} key={ticket.ticket_id}>
                    <Card>
                      <Card.Content header={ticket.subject_line} href={``} />
                      <Card.Content
                        content={`ticket state: ${ticket.ticket_state}`}
                      />
                      <Card.Content
                        content={`ticket time: ${ticket.ticket_time}`}
                      />
                      <Card.Content
                        description={`created on: ${ticket.date_create}`}
                      />
                    </Card>
                  </Grid.Column>
                )
              )
            : "You do not have any tickets created ..."}
        </Grid>
      </Segment>
    </div>
  );
};
