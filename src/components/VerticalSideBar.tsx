import React from "react";
import { Menu, Sidebar, Icon } from "semantic-ui-react";

type VerticalSidebarProps = {
  visible: boolean;
};

export const VerticalSidebar: React.FC<VerticalSidebarProps> = ({
  visible
}) => (
  <Menu
    secondary
    width="thin"
    as={Menu}
    icon="labeled"
    vertical
    visible={visible}
  >
    <Menu.Item as="a">
      <Icon name="user" />
      User
    </Menu.Item>
    <Menu.Item as="a">
      <Icon name="gamepad" />
      Games
    </Menu.Item>
    <Menu.Item as="a">
      <Icon name="camera" />
      Channels
    </Menu.Item>
  </Menu>
);
