import React from "react";
import { Table, Button, Search, Icon } from "semantic-ui-react";
import "../assets/stylesheet.css";

export const Content = () => {
  return (
    <div id="content">
      <div className="searchbar">
        <Search />
      </div>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Company
              <Icon name="filter" className="filterIcon" />
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="right">Status</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">Edit/Remove</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Vulcan Labs</Table.Cell>
            <Table.Cell textAlign="right">42h 32min</Table.Cell>
            <Table.Cell textAlign="right">
              <Button icon="eraser" color="green" />
              <Button icon="trash alternate" color="red" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Paracon</Table.Cell>
            <Table.Cell textAlign="right">21h 17min</Table.Cell>
            <Table.Cell textAlign="right">
              <Button icon="eraser" color="green" />
              <Button icon="trash alternate" color="red" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Hetzner</Table.Cell>
            <Table.Cell textAlign="right">173h 07min</Table.Cell>
            <Table.Cell textAlign="right">
              <Button icon="eraser" color="green" />
              <Button icon="trash alternate" color="red" />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
