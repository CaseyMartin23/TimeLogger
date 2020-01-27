import React, { useState, useEffect } from "react";
import {
  Image,
  Button,
  Container,
  Menu,
  Input,
  Grid,
  Icon
} from "semantic-ui-react";
import { VerticalSidebar } from "../components/VerticalSideBar";

import { Redirect } from "react-router-dom";

// import Logo from "../assets/timelogger_logo.png";
export const Home: React.FC = () => {
  const [active = "home", setActive] = useState({});
  const [loggedIn, setLoggedIN] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState<string | null>(null);

  const fetchUserID = () => {
    fetch("/logged-in-user")
      .then(res => res.json())
      .then(userID => {
        setLoggedIN(userID.value);
      });
  };

  const authUser = () => {
    if (loggedIn === null) return;
    if (loggedIn === "") setRedirecting("/");
  };

  useEffect(fetchUserID, []);
  useEffect(authUser, [loggedIn]);

  return redirecting !== null ? (
    <Redirect to={redirecting} />
  ) : (
    <div>
      <Grid celled="internally">
        <Grid.Row width={15}>
          <Menu color="blue" inverted widths="12">
            <Menu.Item header>TimeLogger</Menu.Item>
            <Menu.Item
              name="home"
              active={active === "home"}
              onClick={(e, { name }) => setActive({ activeItem: name })}
            />
            <Menu.Item
              name="messages"
              active={active === "messages"}
              onClick={(e, { name }) => setActive({ activeItem: name })}
            />
            <Menu.Item
              name="friends"
              active={active === "friends"}
              onClick={(e, { name }) => setActive({ activeItem: name })}
            />
            <Menu.Menu position="right">
              <Menu.Item>
                <Input icon="search" placeholder="Search..." />
              </Menu.Item>
              <Menu.Item
                name="logout"
                active={active === "logout"}
                onClick={(e, { name }) => setActive({ activeItem: name })}
              />
            </Menu.Menu>
          </Menu>
        </Grid.Row>
        <Grid.Row width={5}>
          <VerticalSidebar visible={true} />
        </Grid.Row>
      </Grid>
    </div>
  );
};
