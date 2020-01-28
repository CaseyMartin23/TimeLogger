import React from "react";
import { Divider, Label, List, Button, Modal, Icon } from "semantic-ui-react";

export const ContainerBody = () => {
  // const [activeItem, setactiveItem] = useState({activeItem : String});
  // const handleItemClick = (e: string, { name }:any) => setactiveItem({ activeItem: name })
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
            closeIcon="true"
          />
        </h3>
      </div>
      <Divider />
      <List selection divided verticalAlign="middle">
        <List.Item>
          <List.Content floated="right">
            <Button icon="edit" color="blue" size="tiny" />
            <Button icon="trash" color="red" size="tiny" />
          </List.Content>
          <Icon color="teal" name="briefcase" />
          <List.Content>Vulcanlabs</List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="right">
            <Button icon="edit" color="blue" size="tiny" />
            <Button icon="trash" color="red" size="tiny" />
          </List.Content>
          <Icon color="teal" name="briefcase" />
          <List.Content>Impala</List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="right">
            <Button icon="edit" color="blue" size="tiny" />
            <Button icon="trash" color="red" size="tiny" />
          </List.Content>
          <Icon color="teal" name="briefcase" />
          <List.Content>Paracon</List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="right">
            <Button icon="edit" color="blue" size="tiny" />
            <Button icon="trash" color="red" size="tiny" />
          </List.Content>
          <Icon color="teal" name="briefcase" />
          <List.Content>Food Lovers</List.Content>
        </List.Item>
      </List>
    </div>
  );
};
