import React from "react";
// import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap/";
import { Menu, Container, Dropdown, Image } from "semantic-ui-react";

export const Menubar: React.FC = () => {
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

            <Dropdown item simple text="Dropdown">
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
            </Dropdown>
          </Container>
        </Menu>
        {/* <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <Icon circular name="time" color="blue" inverted size="small" />{" "}
            TimeLogger
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">About</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar> */}
      </>
    </div>
  );
};
