import React, { useState } from "react";
import { Form, Label, Input, Button } from "semantic-ui-react";

type Props = {
  companyID: number;
  projectID: number;
  setShowForm(value: boolean): void;
  setAddedATicket(value: boolean): void;
};

export const TicketForm: React.FC<Props> = ({
  companyID,
  projectID,
  setShowForm,
  setAddedATicket
}) => {
  const [ticketSub, setTicketSub] = useState<string>();
  const [ticketDescript, setTicketDescript] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onSubmitter = async (e: any) => {
    e.preventDefault();
    setAddedATicket(false);
    setLoading(true);
    const ticketInfo = {
      company_id: companyID,
      project_id: projectID,
      subject_line: ticketSub,
      description: ticketDescript
    };
    await fetch("/add-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ticketInfo)
    });
    setLoading(false);
    console.log("This is the tickeinfo ==> ", ticketInfo);
    setShowForm(false);
    setAddedATicket(true);
  };

  return (
    <div style={{ height: "200px", width: "200px" }}>
      <Form onSubmit={onSubmitter}>
        <Form.Field>
          <Label>
            Ticket subject line
            <Input
              onChange={(e: any) => setTicketSub(e.target.value)}
              placeholder="Please enter subject line ..."
            />
          </Label>
        </Form.Field>
        <Form.Field>
          <Label>
            Ticket description
            <Input
              onChange={(e: any) => setTicketDescript(e.target.value)}
              placeholder="Please enter description ..."
            />
          </Label>
        </Form.Field>
        <Form.Field>
          <Button loading={loading} type="submit">
            Submit
          </Button>
        </Form.Field>
      </Form>
    </div>
  );
};
