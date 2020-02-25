import React, { FC, useState, useEffect } from "react";
import { Grid, Button, Icon, Card } from "semantic-ui-react";
import { useRouteMatch } from "react-router";
import { TicketForm } from "./TicketForm";
import { TimerButton } from "./TimerButton";

export const CompanyTickets: FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [userCompTickets, setUserCompTickets] = useState();
  const [loaded, setLoaded] = useState(false);
  const [addedATicket, setAddedATicket] = useState(false);
  const [clicked, setClicked] = useState(false);

  const removeTicket = async (ticket_id: string) => {
    setAddedATicket(false);
    await fetch(`/remove-ticket/${ticket_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    setAddedATicket(true);
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
    fetchCompanyTickets();
  }, [addedATicket, clicked]);

  if (!loaded) {
    return <p>Loading company data...</p>;
  }

  return (
    <div className="companylists">
      <Grid columns={3}>
        <Grid.Column width={14}>
          <Grid.Row
            textAlign="center"
            centered={true}
            style={{ paddingLeft: "50px", padding: "30px" }}
          >
            <h1
              className="CompanyLabel"
              style={{
                textAlign: "center",
                padding: "15px"
              }}
            >
              Tickets for {match?.params.companyName}:
            </h1>
          </Grid.Row>
          <Grid columns={2}>
            {(userCompTickets || []).length > 0 ? (
              (userCompTickets || []).map((ticket: any) => (
                <Grid.Column key={ticket.ticket_id} width={5}>
                  <Card>
                    <Card.Content
                      meta={`#${ticket.ticket_id} (${ticket.ticket_state})`}
                    />
                    <Card.Content header={ticket.subject_line} />
                    <Card.Content description={ticket.description} />
                    <Card.Content style={{ margin: 0, padding: 0 }}>
                      <TimerButton
                        clicked={clicked}
                        setClicked={setClicked}
                        ticketState={ticket.ticket_state}
                        companyID={companyID}
                        ticketID={ticket.ticket_id}
                      />
                    </Card.Content>
                    <Button
                      onClick={() => {
                        removeTicket(ticket.ticket_id);
                      }}
                    >
                      Remove
                    </Button>
                  </Card>
                </Grid.Column>
              ))
            ) : (
              <div style={{ margin: "10px" }}>
                There's no tickets for this company ...
              </div>
            )}
          </Grid>
        </Grid.Column>
        <Grid.Column width={2}>
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
              setAddedATicket={setAddedATicket}
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
