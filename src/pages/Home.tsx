import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { VerticalSidebar } from "../components/VerticalSideBar";
import { Menubar } from "../components/Menubar";
import { ContainerBody } from "../components/Container";
import { Grid, Radio, Modal } from "semantic-ui-react";
import "../stylesheets/AppStyle.css";

export const Home: React.FC = () => {
  const [loggedIn, setLoggedIN] = useState();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  console.log("Im on home page");

  const onRadioClicker = (currentValue: string) => {
    updateUser(currentValue);
    console.log("this is the userRole ==> ", currentValue);
    setOpen(false);
    console.log("User loggedin ==> ", loggedIn);
  };

  const updateUser = (userRole: string) => {
    console.log("updateUser-value->", userRole);
    fetch(`/update-user-role/${userRole}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("This is userRole after update on UI ==> ", userRole);
  };

  const fetchUserData = async () => {
    setLoaded(false);
    const res = await fetch("/whoami");
    if (res.status === 200 || res.status === 302) {
      console.log("result of home_page res is ", res);
      console.log("loggedin check after res", loggedIn);
      const json = await res.json();
      console.log("this is json", json);
      setLoggedIN(json);
      console.log("fetchUserData->", json);
      // if (json.UserRole === "") {
      setOpen(true);
      // }
      return setLoaded(true);
    }
    setLoggedIN(false);
    setLoaded(true);
  };

  useEffect(() => {
    console.log("useEffect");
    fetchUserData();
  }, []);

  if (!loaded) return <div>Loading ...</div>;

  if (!loggedIn.LinkedInId && loaded) return <Redirect to="/login" />;

  return (
    <div className="AppStyle">
      <Modal
        dimmer
        open={open}
        centered={true}
        size="tiny"
        style={{ height: "300px", marginLeft: "30%", marginTop: "10%" }}
      >
        <Modal.Header>Select your position:</Modal.Header>
        <Modal.Content>
          <Grid centered={true}>
            <Grid.Row>
              <Radio
                radio
                label="Freelancer"
                name="radioGroup"
                onClick={() => onRadioClicker("Freelancer")}
                checked={loggedIn.userRole === "Freelancer"}
              />
              <Radio
                radio
                label="Developer"
                name="radioGroup"
                onClick={() => onRadioClicker("Developer")}
                checked={loggedIn.userRole === "Developer"}
              />
              <Radio
                radio
                label="Project Manager"
                name="radioGroup"
                onClick={() => onRadioClicker("Project Manager")}
                checked={loggedIn.userRole === "Project Manager"}
              />
            </Grid.Row>
            <Grid.Row>
              <Radio
                radio
                label="Account Manager"
                name="radioGroup"
                onClick={() => onRadioClicker("Account Manager")}
                checked={loggedIn.userRole === "Account Manager"}
              />
              <Radio
                radio
                label="Admin"
                name="radioGroup"
                onClick={() => onRadioClicker("Admin")}
                checked={loggedIn.userRole === "Admin"}
              />
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>

      <Menubar />
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={2}>
            <VerticalSidebar
              Username={loggedIn.Username}
              Firstname={loggedIn.Firstname}
              Lastname={loggedIn.Lastname}
              UserRole={loggedIn.UserRole}
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <ContainerBody />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {/* <div className="userRole">
                    <Form.Field>Select your role:</Form.Field>
       
                  </div> */}
    </div>
  );
};
