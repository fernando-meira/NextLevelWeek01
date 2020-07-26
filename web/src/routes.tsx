import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import { Home, CreatePoint } from "./pages";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreatePoint} path="/cadastro" exact />
    </BrowserRouter>
  );
};

export default Routes;
