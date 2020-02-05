import React, { FC, useState, useEffect } from "react";
import { Grid, Button, Icon, Card } from "semantic-ui-react";
import { useRouteMatch } from "react-router";
import { TicketForm } from "./TicketForm";
import { TimerButton } from "./TimerButton";

export const CompanyTickets: FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [userCompTickets, setUserCompTickets] = useState();
  const [loaded, setLoaded] = useState(false);

  const removeTicket = (ticket_id: string) => {
    fetch(`/remove-ticket/${ticket_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  const onClicker = () => {
    if (!showForm) return setShowForm(true);
    return setShowForm(false);
  };
  const match = useRouteMatch<{ companyName: string; companyID: string }>(
    "/company-tickets/:companyName/:companyID?"
  );
  const companyID = match?.params.companyID;

  const fetchCompanyTickets = async () => {
    await fetch(`/users-company-tickets/${companyID}`)
      .then(res => res.json())
      .then(data => setUserCompTickets(data));
    setLoaded(true);
  };

  useEffect(() => {
    if (!loaded) fetchCompanyTickets();
  }, [userCompTickets]);

  if (!loaded) {
    return <p>Loading company data...</p>;
  }

  return (
    <div className="companylists">
      <Grid columns={3}>
        <Grid.Column>
          <Grid.Row>
            <h2>{match?.params.companyName}</h2>
          </Grid.Row>
          {(userCompTickets || []).length > 0 ? (
            (userCompTickets || []).map((ticket: any) => (
              <Card key={ticket.ticket_id}>
                <Card.Content meta={`#${ticket.ticket_id}`} />
                <Card.Content header={ticket.subject_line} />
                <Card.Content description={ticket.description} />
                <Card.Content style={{ padding: 0 }}>
                  <TimerButton
                    companyID={companyID}
                    ticketID={ticket.ticket_id}
                  />
                </Card.Content>
                <Button onClick={() => removeTicket(ticket.ticket_id)}>
                  Remove
                </Button>
              </Card>
            ))
          ) : (
            <div style={{ margin: "10px" }}>
              There's no tickets for this company ...
            </div>
          )}
        </Grid.Column>
        <Grid.Column></Grid.Column>
        <Grid.Column>
          <Button
            onClick={onClicker}
            inverted
            color="orange"
            size="tiny"
            style={{ padding: "10px", margin: "5px" }}
          >
            Add a ticket
            <Icon color="black" name="plus" style={{ margin: "5px" }} />
          </Button>
          {showForm ? (
            <TicketForm
              setShowForm={setShowForm}
              companyID={+(match?.params.companyID || 0)}
            />
          ) : (
            ""
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};
