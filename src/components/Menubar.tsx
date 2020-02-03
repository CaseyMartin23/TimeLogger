import React, { useState } from "react";
import { Menu, Container, Button, Modal } from "semantic-ui-react";
import Logo from "../assets/timelogger_logo.png";
// import { Redirect, Link } from "react-router-dom";

export const Menubar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <>
        <Menu fixed="top" inverted color="black">
          <Container>
            <Menu.Item header style={{ width: "250px", padding: 0 }}>
              <img
                src={Logo}
                alt="Timelogger logo"
                style={{ width: "90px", height: "90px", padding: 0 }}
              />
            </Menu.Item>
          </Container>
          <Menu.Item>
            <Button inverted onClick={() => setOpen(true)}>
              Log out
            </Button>
            <Modal
              size="tiny"
              open={open}
              style={{ marginLeft: "30%", height: "250px" }}
            >
              <Modal.Header>Log out</Modal.Header>
              <Modal.Content>
                <p>Are you sure you want to log out?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button negative onClick={() => setOpen(false)}>
                  No
                </Button>
                <Button
                  positive
                  icon="checkmark"
                  labelPosition="right"
                  content="Yes"
                  href="http://localhost:3005/auth/logout"
                />
              </Modal.Actions>
            </Modal>
          </Menu.Item>
          w{" "}
        </Menu>
      </>
    </div>
  );
};
