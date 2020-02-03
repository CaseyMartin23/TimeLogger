import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Header, Segment, Icon } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

export const Login: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const isUserLoggedIn = async () => {
    setLoading(true);
    const res = await fetch("/whoami");
    if (res.status === 200 || res.status === 302) {
      const json = await res.json();
      console.log(json);
      if (json.LinkedinId && json.LinkedinId.toString().length > 0) {
        setIsLoggedIn(true);
        return setLoading(false);
      }
      setIsLoggedIn(false);
      return setLoading(false);
    }
    return setLoading(false);
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (isLoggedIn && loading) return <Redirect to="/" />;

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
