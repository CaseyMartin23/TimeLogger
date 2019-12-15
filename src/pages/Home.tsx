import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { VerticalSidebar } from "../components/VerticalSideBar";
import { Menubar } from "../components/Menubar";
import { ContainerBody } from "../components/Container";
import {
  Image,
  Button,
  Container,
  Menu,
  Input,
  Grid,
  Icon
} from "semantic-ui-react";
import "../stylesheets/AppStyle.css";

export const Home: React.FC = () => {
  const [active, setActive] = useState();
  const [loggedIn, setLoggedIN] = useState();
  const [loaded, setLoaded] = useState<boolean>(false);

  const fetchUserData = async () => {
    setLoaded(false);
    const res = await fetch("/whoami");
    if (res.status === 200 || res.status === 302) {
      const json = await res.json();
      setLoggedIN(json.LinkedinId);
      return setLoaded(true);
    }
    setLoggedIN(false);
    setLoaded(true);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  console.log("Loggedin ===> ", loggedIn);

  if (!loaded) {
    console.log("Im on the home page .....");
    return <div>Loading ...</div>;
  }

  if (!loggedIn && loaded) return <Redirect to="/" />;

  return (
    <div className="AppStyle">
      <Menubar />
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={2}>
            <VerticalSidebar />
          </Grid.Column>
          <Grid.Column width={12}>
            <ContainerBody />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};
