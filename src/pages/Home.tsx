import React, { useState, useEffect } from "react";
import "../stylesheets/AppStyle.css";
import { Grid, Segment, Button, Card } from "semantic-ui-react";

type TicketType = {
  ticket_id: number;
  user_id: number;
  company_id: number;
  project_id: number;
  subject_line: string;
  description: string;
  ticket_state: string;
  ticket_time: null;
  date_create: string;
};

export const Home: React.FC = () => {
  const [allUserTickets, setAllUserTickets] = useState();

  const getAllUserTickets = async () => {
    await fetch("/all-user-tickets")
      .then(res => res.json())
      .then(data => setAllUserTickets(data));
  };

  console.log("allUserTickets ==> ", allUserTickets);

  const openState = (allUserTickets || []).filter(
    (ticket: TicketType) => ticket.ticket_state === "Open"
  );
  const inProgressState = (allUserTickets || []).filter(
    (ticket: TicketType) => ticket.ticket_state === "In Progress"
  );
  const pausedState = (allUserTickets || []).filter(
    (ticket: TicketType) => ticket.ticket_state === "Paused"
  );
  const completedState = (allUserTickets || []).filter(
    (ticket: TicketType) => ticket.ticket_state === "Completed"
  );

  const ticketState = (state: string) => {};

  useEffect(() => {
    getAllUserTickets();
  }, []);

  return (
    <div className="companylists">
      <Grid columns={2}>
        <Grid.Column width={13}>
          {(allUserTickets || []).length > 0 ? (
            <Segment.Group horizontal>
              <Segment>
                <h4>Open</h4>
                {(allUserTickets || []).length > 0
                  ? (openState || []).map((ticket: TicketType) => (
                      <Card key={ticket.ticket_id}>
                        <Card.Content
                          header={ticket.subject_line}
                          href={`/ticket/${ticket.ticket_id}`}
                        />
                      </Card>
                    ))
                  : ""}
              </Segment>
              <Segment>
                <h4>In Progress</h4>
                {(allUserTickets || []).length > 0
                  ? (inProgressState || []).map((ticket: TicketType) => (
                      <Card key={ticket.ticket_id}>
                        <Card.Content
                          header={ticket.subject_line}
                          href={`/ticket/${ticket.ticket_id}`}
                        />
                      </Card>
                    ))
                  : ""}
              </Segment>
              <Segment>
                <h4>Paused</h4>
                {(allUserTickets || []).length > 0
                  ? (pausedState || []).map((ticket: TicketType) => (
                      <Card key={ticket.ticket_id}>
                        <Card.Content
                          header={ticket.subject_line}
                          href={`/ticket/${ticket.ticket_id}`}
                        />
                      </Card>
                    ))
                  : ""}
              </Segment>
              <Segment>
                <h4>Compleled</h4>
                {(allUserTickets || []).length > 0
                  ? (completedState || []).map((ticket: TicketType) => (
                      <Card key={ticket.ticket_id}>
                        <Card.Content
                          header={ticket.subject_line}
                          href={`/ticket/${ticket.ticket_id}`}
                        />
                      </Card>
                    ))
                  : ""}
              </Segment>
            </Segment.Group>
          ) : (
            "Create some companies, projects and tickets ..."
          )}
        </Grid.Column>
        <Grid.Column width={3}>
          <Button>Create a new company</Button>
        </Grid.Column>
      </Grid>
    </div>
  );
};
