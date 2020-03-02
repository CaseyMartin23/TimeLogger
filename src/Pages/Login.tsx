import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

export const Login: React.FC = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getLoggedInState = async () => {
    setLoaded(false);
    await fetch("/whoami")
      .then(res => res.json())
      .then(data => {
        console.log("getLoggedInState data ==> ", data);
      });
    setLoaded(true);
  };

  useEffect(() => {
    if (!loaded) {
      getLoggedInState();
    }
  }, [loaded]);

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/logo.png" /> Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
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
              color="teal"
              fluid
              size="large"
              href="http://localhost:3005/auth/linkedin/redirect"
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="#">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
