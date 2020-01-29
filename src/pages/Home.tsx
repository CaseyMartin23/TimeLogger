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
  const [userRole, setUserRole] = useState("");

  const onRadioClicker = (currentValue: string) => {
    setUserRole(currentValue);
  };

  const roleSpecification = () => {
    // if (userRole === "") return "Please specify your role... ";
  };

  const fetchUserData = async () => {
    setLoaded(false);
    const res = await fetch("/whoami");
    if (res.status === 200 || res.status === 302) {
      console.log("This is res ", res);
      console.log("loggedin check after res", loggedIn);
      const json = await res.json();
      console.log("this is json", json);

      setLoggedIN(json.LinkedinId);
      return setLoaded(true);
    }
    setLoggedIN(false);
    setLoaded(true);
  };

  const postUserRole = () => {
    fetch(`/user-role/${userRole}`);
    console.log("This is the userRole ==> ", userRole);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(postUserRole, [userRole]);

  console.log("Loggedin ===> ", loggedIn);
  console.log("Im on home page");

  if (!loaded) return <div>Loading ...</div>;

  if (!loggedIn && loaded) return <Redirect to="/login" />;

  return (
    <div className="AppStyle">
      <Modal
        dimmer
        open={userRole === ""}
        centered={true}
        size="tiny"
        style={{ height: "300px", marginLeft: "30%" }}
      >
        <Modal.Header>Select your position:</Modal.Header>
        <Modal.Content>
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
        </Modal.Content>
      </Modal>

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
      {/* <div className="userRole">
                    <Form.Field>Select your role:</Form.Field>
       
                  </div> */}
    </div>
  );
};
