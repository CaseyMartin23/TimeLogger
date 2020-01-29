import React, { useState } from "react";
import { Menu, Container, Image, Button, Modal } from "semantic-ui-react";
import { Redirect, Link } from "react-router-dom";

export const Menubar: React.FC = () => {
  const [open, setOpen] = useState(false);
  // const [redirect, setRedirect] = useState(false);

  // const confirmLogOut = () => {};

  // const cancelLogOut = () => setOpen(false);

  return (
    <div>
      <>
        <Menu fixed="top" inverted color="black">
          <Container>
            <Menu.Item as="a" header style={{ width: "250px" }}>
              <Image
                size="mini"
                src="/logo.png"
                style={{ marginRight: "50px" }}
              />
              Project Name
            </Menu.Item>
            <Menu.Item as="a">Home</Menu.Item>

            {/* <Dropdown item simple text="Dropdown">
              <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Header Item</Dropdown.Header>
              <Dropdown.Item>
              <i className="dropdown icon" />
              <span className="text">Submenu</span>
              <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
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
          {/* <Button onClick={() => }></Button> */}
        </Menu>
      </>
    </div>
  );
};
