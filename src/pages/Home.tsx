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
