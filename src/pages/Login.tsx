import React, { useState, useEffect } from "react";
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
import { Redirect } from "react-router-dom";

export const Login: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const isUserLoggedIn = () => {
    setLoading(true);
    fetch("/whoami")
      .then(res => res.json())
      .then(jsonRes => {
        if (!jsonRes.LinkedinId) setIsLoggedIn(false);
        if (jsonRes) setIsLoggedIn(true);
      });
    setLoading(false);
  };

  useEffect(isUserLoggedIn, []);

  if (loading) return <div>Loading ...</div>;

  if (isLoggedIn) return <Redirect to="/Home" />;

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

            <Button
              href="http://localhost:3005/auth/linkedin"
              color="blue"
              fluid
              size="large"
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us?{" "}
          <a href="http://localhost:3005/auth/linkedin">
            {" "}
            Sign Up with LinkedIn
          </a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
