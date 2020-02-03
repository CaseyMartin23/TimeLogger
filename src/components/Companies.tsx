import React from "react";
import { Divider, Label, List, Button, Modal, Icon } from "semantic-ui-react";
// import {MenuBar} fro

export const Companies: React.FC = () => {
  return (
    <div className="companylists">
      <div className="company_container">
        <h3>
          Companies
          <Modal
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              height: "200px"
            }}
            trigger={
              <Button as="div" labelPosition="left" className="addButton">
                <Label as="a" basic>
                  Add a company
                </Label>
                <Button icon color="green">
                  <Icon name="plus" />
                </Button>
              </Button>
            }
            header="Reminder!"
            content="Call Benjamin regarding the reports."
            actions={[
              "Snooze",
              { key: "done", content: "Done", positive: true }
            ]}
            // closeIcon="true"
          />
        </h3>
      </div>
      <Divider />
      <List selection divided verticalAlign="middle"></List>
    </div>
  );
};
