import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../assets/css/dev.css";
import { URL_PATH } from "../config/urlPath";
import Play from "./Play";
import UserList from "./UserList";

class App extends Component {
  render() {
    return (
      <React.Fragment>
          <BrowserRouter>
            <Switch>
              <Route path={URL_PATH.USER_LIST} exact component={UserList} />
              <Route path={URL_PATH.PLAY_AREA} exact component={Play} />
            </Switch>
          </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
