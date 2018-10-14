import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./app/index.jsx";
import GifCard from "./app/components/GifCard/index.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/gif/:id" component={GifCard} />
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
