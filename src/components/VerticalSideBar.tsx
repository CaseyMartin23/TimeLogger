import React from "react";
import { Menu, Image, Header } from "semantic-ui-react";

interface Props {
  UserInfo: {
    Username: string;
    Firstname: string;
    Lastname: string;
    UserRole: string;
    UserProfileImg: string;
  };
}

export const VerticalSidebar: React.FC<Props> = props => {
  return (
    <div className="sidebar">
      <Menu compact={true} vertical>
        <Menu.Item>
          <Header as="h4">
            <Image circular src={props.UserInfo.UserProfileImg} size="mini" />
            {props.UserInfo.Username || "No username"} :{" "}
            {props.UserInfo.UserRole || "Unassigned"}
          </Header>
        </Menu.Item>
        <Menu.Item as="a" href="/">
          <h4>Home</h4>
        </Menu.Item>

        <Menu.Item as="a" href="/companies">
          <h6>Companies</h6>
        </Menu.Item>
        <Menu.Item as="a" href="/projects">
          <h6>Projects</h6>
        </Menu.Item>
        <Menu.Item as="a" href="/tickets">
          <h6>Tickets</h6>
        </Menu.Item>
        <Menu.Item as="a" href="/hub">
          <h6>Hub</h6>
        </Menu.Item>
        <Menu.Item as="a" href="/summary">
          <h6>Summary</h6>
        </Menu.Item>
      </Menu>
    </div>
  );
};
