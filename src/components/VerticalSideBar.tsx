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
      <Menu fixed="left" vertical>
        <Menu.Item>
          <Header as="h4">
            <Image circular src={props.UserInfo.UserProfileImg} size="mini" />
            {props.UserInfo.Username || "No username"} :{" "}
            {props.UserInfo.UserRole || "Unassigned"}
          </Header>
        </Menu.Item>
        <Menu.Item>
          <h4>Dashboard</h4>
        </Menu.Item>

        <Menu.Item as="a" href="/">
          Home
        </Menu.Item>

        <Menu.Item as="a" href="/companies">
          Companies
        </Menu.Item>
        <Menu.Item as="a" href="/tickets">
          Tickets
        </Menu.Item>
      </Menu>
    </div>
  );
};
