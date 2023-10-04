import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainTemplate from "../components/template/MainTemplate";

const AppProviders = ({ children }) => {
  return (
    <Router>
      <MainTemplate>{children}</MainTemplate>
    </Router>
  );
};

export default AppProviders;
