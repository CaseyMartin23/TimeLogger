import React from "react";
import { Dashboard } from "./Dashboard";
import { Sidebar } from "./Sidebar";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "navbar navbar"
    "sidebar content";
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content 1fr;
  height: 100vh;
`;

const NavbarWrapper = styled.div`
  grid-area: navbar;
`;

const SidebarWrapper = styled.div`
  grid-area: sidebar;
  min-height: calc(50px - 100vh);
`;

const ContentWrapper = styled.div`
  grid-area: content;
  min-height: calc(50px - 100vh);
  overflow-y: auto;
`;

export const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <NavbarWrapper>
        <Dashboard />
      </NavbarWrapper>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};
