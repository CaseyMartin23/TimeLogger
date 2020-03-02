import React from "react";
import "semantic-ui-css/semantic.css";
import { Menu, Dropdown, Button } from "semantic-ui-react";

export const Navbar: React.FC = () => {
  return (
    <div>
      <Menu>
        <Menu.Item header name="TimeLogger" />
        <Dropdown item icon="wrench" simple>
          <Dropdown.Menu>
            <Dropdown.Item>User settings</Dropdown.Item>
            <Dropdown.Item>Edit Permissions</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Menu position="right">
          <Menu.Item icon="user circle" name="Profile" />
          <Menu.Item>
            <Button primary>Logout</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};
