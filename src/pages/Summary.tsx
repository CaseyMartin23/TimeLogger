import React, { useState, useEffect, SetStateAction } from "react";
import {
  Segment,
  Dropdown,
  Table,
  Grid,
  Search,
  Menu,
  Icon
} from "semantic-ui-react";

type TimeLog = {
  company_id: number;
  Username: string;
  ticket_id: number;
  subject_line: string;
  description: string;
  ticket_state: string;
  ticket_time: number | null;
  date_create: string;
};

export const Summary: React.FC = () => {
  const [timeLogData, setTimeLogData] = useState([] || undefined);
  const [loaded, setLoaded] = useState(false);

  const getAllTime = async () => {
    setLoaded(false);
    await fetch(`/get-timelogged-data/`)
      .then(res => res.json())
      .then(data => setTimeLogData(data));
    setLoaded(true);
  };

  useEffect(() => {
    if (!loaded) getAllTime();
  }, [loaded]);

  console.log("timeLogData ==> ", timeLogData);

  return (
    <div className="companylists">
      <h3>Summary of logged time:</h3>
      <Menu pagination>
        <Menu.Item as="a" icon>
          <Icon name="chevron left" />
        </Menu.Item>
        <Menu.Item as="a">1</Menu.Item>
        <Menu.Item as="a" icon>
          <Icon name="chevron right" />
        </Menu.Item>
      </Menu>

      <Segment>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date Created</Table.HeaderCell>
              <Table.HeaderCell>Created by</Table.HeaderCell>
              <Table.HeaderCell>Ticket</Table.HeaderCell>
              <Table.HeaderCell>Ticket Time</Table.HeaderCell>
              <Table.HeaderCell>Ticket State</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {timeLogData.map((ticket: TimeLog) => {
            return (
              <Table.Body key={ticket.ticket_id}>
                <Table.Row>
                  <Table.Cell>{ticket.date_create}</Table.Cell>
                  <Table.Cell>{ticket.Username}</Table.Cell>
                  <Table.Cell>{ticket.subject_line}</Table.Cell>
                  <Table.Cell>{ticket.ticket_time}</Table.Cell>
                  <Table.Cell>{ticket.ticket_state}</Table.Cell>
                </Table.Row>
              </Table.Body>
            );
          })}
        </Table>
      </Segment>
    </div>
  );
};
