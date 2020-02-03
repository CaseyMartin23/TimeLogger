import React, { useState } from "react";
import { TicketForm } from "./TicketForm";
import { Button, Icon, Grid, Card } from "semantic-ui-react";

export const Tickets: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [ticketInfo, setTicketInfo] = useState();

  const onClicker = () => {
    if (!showForm) return setShowForm(true);
    return setShowForm(false);
  };

  return (
    <div>
      <div className="companylists">
        <Grid columns={2}>
          <Grid.Column>
            <h3>
              Tickets
              <Button
                onClick={onClicker}
                inverted
                color="orange"
                size="tiny"
                style={{ padding: "10px", margin: "5px" }}
              >
                Add a ticket
                <Icon
                  color="black"
                  name="plus"
                  style={{ margin: "5px" }}
                ></Icon>
              </Button>
            </h3>
            {showForm ? <TicketForm setTicketInfo={setTicketInfo} /> : ""}
          </Grid.Column>
          <Grid.Column>List items ...!!</Grid.Column>
        </Grid>
      </div>
    </div>
  );
};
