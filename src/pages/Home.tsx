import React from "react";
import "../stylesheets/AppStyle.css";
import { Tickets } from "../components/Tickets";
import { Card } from "semantic-ui-react";

export const Home: React.FC = () => {
  return (
    <div className="AppStyle">
      <div className="companylists">
        <Card>
          <Card.Content>
            <Card.Header>ticket in progress</Card.Header>
            <Card.Meta>
              <span className="date">Joined in 2015</span>
            </Card.Meta>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>ticket in review</Card.Header>
            <Card.Meta>
              <span className="date">Joined in 2015</span>
            </Card.Meta>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>ticket done</Card.Header>
            <Card.Meta>
              <span className="date">Joined in 2015</span>
            </Card.Meta>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};
