import React from "react";
import { Menu, Dropdown, Icon, Image, Header } from "semantic-ui-react";
import image from "../assets/sample.png";
export const VerticalSidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <Menu vertical>
        <Menu.Item>
          <Header as="h4">
            <Image circular src={image} size="mini" />
            Patrick
          </Header>
        </Menu.Item>
        <Menu.Item>
          <h4>Dashboard</h4>
        </Menu.Item>

        <Menu.Item>
          Home
          <Menu.Menu>
            <Menu.Item
              name="search"
              // active={activeItem === 'search'}
              // onClick={this.handleItemClick}
            >
              Search
            </Menu.Item>
            <Menu.Item
              name="add"
              // active={activeItem === 'add'}
              // onClick={this.handleItemClick}
            >
              Add
            </Menu.Item>
            <Menu.Item
              name="about"
              // active={activeItem === 'about'}
              // onClick={this.handleItemClick}
            >
              Remove
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item
          name="browse"
          // active={activeItem === 'browse'}
          // onClick={this.handleItemClick}
        >
          <Icon name="grid layout" />
          Browse
        </Menu.Item>
        <Menu.Item
          name="messages"
          // active={activeItem === 'messages'}
          // onClick={this.handleItemClick}
        >
          Messages
        </Menu.Item>

        <Dropdown item text="More">
          <Dropdown.Menu>
            <Dropdown.Item icon="edit" text="Edit Profile" />
            <Dropdown.Item icon="globe" text="Choose Language" />
            <Dropdown.Item icon="settings" text="Account Settings" />
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item link>Companies</Menu.Item>
        <Menu.Item link>Log out</Menu.Item>
      </Menu>
    </div>
  );
};