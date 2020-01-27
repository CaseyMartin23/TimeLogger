import React from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap/";
import { Icon } from "semantic-ui-react";

export const Menubar: React.FC = () => {
  return (
    <div>
      <>
        <Navbar bg="dark" variant="dark">
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
        </Navbar>
      </>
    </div>
  );
};
