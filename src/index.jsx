import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import App from "./app/index.jsx";

ReactDOM.render(
<BrowserRouter>
  <Switch>
    <Route path="/" component={App} />
  </Switch>
</BrowserRouter>, document.getElementById("root"));
