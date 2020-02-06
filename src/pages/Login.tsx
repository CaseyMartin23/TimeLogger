import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Header, Segment, Icon } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

export const Login: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  console.log("Im on the login ...");

  const isUserLoggedIn = async () => {
    setLoading(false);
    console.log("isLoggedIn ===> ", isLoggedIn);
    const res = await fetch("/whoami");
    console.log("res ==> ", res);
    if (res.status === 200 || res.status === 302) {
      const json = await res.json();
      console.log("after jsoned ...");
      if (json.LinkedinId && json.LinkedinId.toString().length > 0) {
        setIsLoggedIn(true);
        setLoading(true);
        return setLoaded(true);
      }
      console.log("Failed auth ...");
      setIsLoggedIn(false);
      setLoading(false);
      return setLoaded(true);
    }
    console.log("all done ...");
    setLoading(false);
    return setLoaded(true);
  };

  // console.log("loading before ===>", loading);
  // console.log("loaded before ==> ", loaded);

  useEffect(() => {
    if (!isLoggedIn) isUserLoggedIn();
    console.log("loading after ===>", loading);
    console.log("loaded after  ==> ", loaded);
  }, []);

  console.log("loading right after ===>", loading);
  console.log("loaded right after  ==> ", loaded);

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
