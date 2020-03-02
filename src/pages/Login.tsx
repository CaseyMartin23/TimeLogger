import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Header, Segment, Icon } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

export const Login: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("Im on the login ...");

  const isUserLoggedIn = async () => {
    setLoading(true);
    try {
      await fetch("/whoami")
        .then(res => res.json())
        .then(data => {
          console.log("isUserLoggedIn ==> ", data);
          setIsLoggedIn(true);
        });
    } catch (e) {
      console.log(e);
      return <div>Could not find user's information.</div>;
    }
    setLoading(false);
  };

  // console.log("loading before ===>", loading);
  // console.log("loaded before ==> ", loaded);

  useEffect(() => {
    if (!isLoggedIn) isUserLoggedIn();
  }, [isLoggedIn]);

  // console.log("loading right after ===>", loading);
  // console.log("loaded right after  ==> ", loaded);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (isLoggedIn && !loading) return <Redirect to="/" />;

  return (
    <Grid centered={true} style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          TimeLogger
        </Header>

        <Header as="h3" color="blue" textAlign="center">
          Log In
        </Header>
        <Segment placeholder>
          <Form>
            <Button href="http://localhost:3005/auth/linkedin" color="linkedin">
              <Icon name="linkedin" />
              Login
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
