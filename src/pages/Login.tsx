import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Header, Segment, Icon } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

export const Login: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const isUserLoggedIn = async () => {
    setLoading(true);
    console.log("Loading is ==> ", loading);
    const res = await fetch("/whoami");
    console.log("this is result of res ==> ", res);
    if (res.status === 200 || res.status === 302) {
      const json = await res.json();
      console.log("this is json", json);
      console.log("this is first call for isloggedIn", isLoggedIn);
      if (json.LinkedinId !== "") {
        setIsLoggedIn(true);
        return setLoading(false);
      }
      console.log("this is second call for isloggedIn", isLoggedIn);
      return setIsLoggedIn(false);
    }
    console.log("Im done loading ...");
    return setLoading(false);
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  if (loading) {
    console.log("Im on the login page .....");
    return <div>Loading ...</div>;
  }

  console.log("Is User logged in ===> ", isLoggedIn);

  if (isLoggedIn) return <Redirect to="/" />;

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
