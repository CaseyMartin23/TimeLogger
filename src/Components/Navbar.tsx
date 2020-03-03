import React from "react";
import "semantic-ui-css/semantic.css";
import { Menu, Dropdown, Button, Modal, Header } from "semantic-ui-react";
import "../assets/stylesheet.css";
import { Form } from "semantic-ui-react";

export const Navbar: React.FC = () => {
  return (
    <div>
      <Menu>
        <Menu.Item header name="TimeLogger" />
        <Dropdown item icon="plus circle" simple>
          <Dropdown.Menu>
            <Modal
              size="tiny"
              dimmer="blurring"
              className="modal"
              trigger={<Dropdown.Item>Add Company</Dropdown.Item>}
              closeIcon
            >
              <Header icon="group" content="Company Name" />
              <Modal.Content>
                <Modal.Description>
                  <Form>
                    <Form.Group widths="equal">
                      <Form.Input fluid placeholder="Type here" />
                    </Form.Group>
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button primary>Add</Button>
              </Modal.Actions>
            </Modal>
            <Dropdown.Item>Add Project</Dropdown.Item>
            <Dropdown.Item>Add Ticket</Dropdown.Item>
            <Dropdown.Item>Add Time</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Menu position="right">
          <Menu.Item icon="user circle" name="Profile" />
          <Menu.Item>
            <Button primary href="http://localhost:3005/auth/logout">
              Logout
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};
