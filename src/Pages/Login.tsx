import React, { useState, useEffect } from "react";
import { Button, Grid, Header, Segment, Icon } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

export const Login: React.FC = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getLoggedInState = async () => {
    setLoaded(false);
    try {
      await fetch("/whoami")
        .then(res => res.json())
        .then(data => setUserLoggedIn(data));
    } catch (e) {
      console.log(e);
    }
    setLoaded(true);
  };

  useEffect(() => {
    if (!loaded) {
      getLoggedInState();
    }
  }, [loaded]);

  if (!loaded) return <div>Loading ...</div>;

  if (userLoggedIn && loaded) return <Redirect to="/" />;

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment stacked>
          <Header as="h2" color="blue" textAlign="center">
            <div>
              Log-in with Linked
              <Icon loading name="linkedin" />
            </div>
          </Header>
          <Button
            color="blue"
            fluid
            size="large"
            href="http://localhost:3005/auth/linkedin/redirect"
          >
            Login
          </Button>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
