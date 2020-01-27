import React from "react";
import { VerticalSidebar } from "../components/VerticalSideBar";
import "../stylesheets/AppStyle.css";
import { Menubar } from "../components/Menubar";
import { ContainerBody } from "../components/Container";
import { Grid } from "semantic-ui-react";
export const Home: React.FC = () => {
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
