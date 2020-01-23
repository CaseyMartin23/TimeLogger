import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  // Image,
  Message,
  Segment
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export const Login: React.FC = () => {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          {/* <Image src="/assets/linkedin.png" /> */}
          Sign in
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button color="blue" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us?{" "}
          <a href="http://localhost:3005/auth/linkedin">
            Sign Up with LinkedIn
          </a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
