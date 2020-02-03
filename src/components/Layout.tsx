import React, { FC, useState, useEffect } from "react";
import { Menubar } from "./Menubar";
import { Grid } from "semantic-ui-react";
import { VerticalSidebar } from "./VerticalSideBar";
import "../stylesheets/AppStyle.css";
import { Redirect } from "react-router";
import UserRoleModal from "./UserRoleModal";

type LayoutProps = {
  children: any;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const [loggedIn, setLoggedIN] = useState();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const fetchUserData = async () => {
    setLoaded(false);
    const res = await fetch("/whoami");
    if (res.status === 200 || res.status === 302) {
      const json = await res.json();
      console.log("This is json ==> ", json);
      setLoggedIN(json);
      if (json.UserRole === "" || !json.UserRole) {
        setOpen(true);
      }
      return setLoaded(true);
    }
    setLoggedIN(null);
    return setLoaded(true);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!loaded) return <div>Loading ...</div>;

  if (!loggedIn && loaded) return <Redirect to="/login" />;

  return (
    <div className="AppStyle">
      <UserRoleModal
        loggedIn={loggedIn}
        setLoggedIN={setLoggedIN}
        open={open}
        setOpen={setOpen}
      />
      <Menubar />
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={2}>
            <VerticalSidebar
              Username={loggedIn.Username}
              Firstname={loggedIn.Firstname}
              Lastname={loggedIn.Lastname}
              UserRole={loggedIn.UserRole}
              UserProfileImg={loggedIn.UserProfileImg}
            />
          </Grid.Column>
          <Grid.Column width={12}>{children}</Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Layout;
