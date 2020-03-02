import React from "react";
import "semantic-ui-css/semantic.css";
import { Navbar } from "./Navbar";
import { Content } from "./Content";

export const Dashboard: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Content />
    </div>
  );
};
