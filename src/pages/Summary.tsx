import React, { useState, useEffect, SetStateAction } from "react";
import { Segment, Dropdown, Table, Grid, Search } from "semantic-ui-react";

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
  const [sort, setSort] = useState<any>("month");
  const [timeLogData, setTimeLogData] = useState([] || undefined);
  const [loaded, setLoaded] = useState(false);

  const dateOptions = [
    { key: 1, text: "today", value: "today" },
    { key: 2, text: "this week", value: "week" },
    { key: 3, text: "this month", value: "month" },
    { key: 4, text: "this year", value: "year" }
  ];

  const getAllTime = async (sorter: string) => {
    setLoaded(false);
    await fetch(`/get-timelogged-data/${sort}`)
      .then(res => res.json())
      .then(data => setTimeLogData(data));
    setLoaded(true);
  };

  useEffect(() => {
    if (!loaded) getAllTime(sort);
  }, [loaded, sort]);

  console.log("timeLogData ==> ", timeLogData);

  return (
    <div className="companylists">
      <Dropdown
        placeholder="Sort by ..."
        selection
        options={dateOptions}
        onChange={(e: any, { value }) => setSort(value)}
      />

      <Segment>
        Tickets sorted by: {sort}
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date Created</Table.HeaderCell>
              <Table.HeaderCell>Created by</Table.HeaderCell>
              <Table.HeaderCell>Ticket</Table.HeaderCell>
              <Table.HeaderCell>Ticket Time</Table.HeaderCell>
              <Table.HeaderCell>Ticket State</Table.HeaderCell>
              <Table.HeaderCell>Ticket ID</Table.HeaderCell>
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
                  <Table.Cell>{ticket.ticket_id}</Table.Cell>
                </Table.Row>
              </Table.Body>
            );
          })}
        </Table>
      </Segment>
    </div>
  );
};
