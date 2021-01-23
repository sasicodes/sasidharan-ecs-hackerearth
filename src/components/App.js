import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../assets/css/dev.css";
import { URL_PATH } from "../config/urlPath";
import List from "./List";
import { IndexedDB } from "react-indexed-db";
import { initDB } from "react-indexed-db";
import { DBConfig } from "./DBConfig";
initDB(DBConfig);

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <IndexedDB
          name="hackerEarthECS"
          version={1}
          objectStoresMeta={[
            {
              store: "books",
              storeConfig: { keyPath: "id", autoIncrement: true },
              storeSchema: [
                {
                  name: "bookID",
                  keypath: "bookID",
                  options: { unique: true },
                },
              ],
            },
          ]}
        >
          <BrowserRouter>
            <Switch>
              <Route path={URL_PATH.USER_LIST} exact component={List} />
            </Switch>
          </BrowserRouter>
        </IndexedDB>
      </React.Fragment>
    );
  }
}

export default App;
