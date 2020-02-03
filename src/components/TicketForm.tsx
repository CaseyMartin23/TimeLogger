import React, { useState } from "react";
import { Form, Label, Input, Button } from "semantic-ui-react";

export const TicketForm: React.FC = () => {
  const [ticketSub, setTicketSub] = useState<string>();
  const [ticketDescript, setTicketDescript] = useState<string>();

  const subOnChanger = (e: any) => {
    setTicketSub(e.target.value);
  };

  const descriptionOnChanger = (e: any) => {
    setTicketDescript(e.target.value);
  };

  const onSubmitter = (e: any) => {
    e.preventDefault();
    fetch("");
  };

  return (
    <div style={{ height: "200px", width: "200px" }}>
      <Form onSubmit={onSubmitter}>
        <Form.Field>
          <Label>
            Ticket subject line
            <Input
              onChange={subOnChanger}
              placeholder="Please enter subject line ..."
            />
          </Label>
        </Form.Field>
        <Form.Field>
          <Label>
            Ticket description
            <Input
              onChange={descriptionOnChanger}
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
