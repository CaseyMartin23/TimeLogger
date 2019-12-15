import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Radio,
  Message,
  Segment,
  Icon
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

export const Login: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");

  const onRadioClicker = (currentValue: string) => {
    setUserRole(currentValue);
  };

  const isUserLoggedIn = async () => {
    setLoading(true);
    console.log("Loading is ==> ", loading);
    const res = await fetch("/whoami");
    if (res.status === 200 || res.status === 302) {
      const json = await res.json();
      if (!json.LinkedinId) setIsLoggedIn(false);
      return setIsLoggedIn(true);
    }
    console.log("Im done loading ...");
    return setLoading(false);
  };

  const postUserRole = () => {
    fetch(`/user-role/${userRole}`);
    console.log("This is the userRole ==> ", userRole);
  };

  useEffect(() => isUserLoggedIn());

  useEffect(postUserRole, [userRole]);

  if (loading) {
    console.log("Im on the login page .....");
    return <div>Loading ...</div>;
  }

  if (isLoggedIn) return <Redirect to="/home" />;

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
            <div className="userRole">
              <Form.Field>Select your role:</Form.Field>
              <Radio
                radio
                label="Freelancer"
                name="radioGroup"
                onClick={() => onRadioClicker("freelance")}
                checked={userRole === "freelance"}
              />
              <Radio
                radio
                label="Developer"
                name="radioGroup"
                onClick={() => onRadioClicker("dev")}
                checked={userRole === "dev"}
              />
              <Radio
                radio
                label="Project Manager"
                name="radioGroup"
                onClick={() => onRadioClicker("project_man")}
                checked={userRole === "project_man"}
              />
              <Radio
                radio
                label="Account Manager"
                name="radioGroup"
                onClick={() => onRadioClicker("acc_man")}
                checked={userRole === "acc_man"}
              />
              <Radio
                radio
                label="Admin"
                name="radioGroup"
                onClick={() => onRadioClicker("admin")}
                checked={userRole === "admin"}
              />
            </div>
            <Button href="http://localhost:3005/auth/linkedin" color="linkedin">
              <Icon name="linkedin" />
              Login
            </Button>
          </Form>
        </Segment>
        <Message></Message>
      </Grid.Column>
    </Grid>
  );
};
