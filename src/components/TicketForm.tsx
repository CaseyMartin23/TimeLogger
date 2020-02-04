import React, { useState } from "react";
import { Form, Label, Input, Button } from "semantic-ui-react";

type Props = {
  companyID: number;
};

export const TicketForm: React.FC<Props> = ({ companyID }) => {
  const [ticketSub, setTicketSub] = useState<string>();
  const [ticketDescript, setTicketDescript] = useState<string>();

  const onSubmitter = (e: any) => {
    const ticketInfo = {
      company_id: companyID,
      subject_line: ticketSub,
      description: ticketDescript
    };
    e.preventDefault();
    fetch("/add-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ticketInfo)
    });
    console.log("This is the tickeinfo ==> ", ticketInfo);
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
          <Button type="submit">Submit</Button>
        </Form.Field>
      </Form>
    </div>
  );
};
