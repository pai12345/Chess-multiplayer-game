import React, { useState, useCallback, memo, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import JoinRoom from "./onboard/joinroom";
import { ColorContext } from "./context/colorcontext";
import Onboard from "./onboard/onboard";
import JoinGame from "./onboard/joingame";
import ChessGame from "./chess/ui/chessgame";
import "./App.css";

/**
 * Root Component and is responsible for generating and routing other components dynamically.
 */
const App = memo(() => {
  const [didRedirect, setDidRedirect] = useState(false);

  const playerDidRedirect = useCallback(() => {
    setDidRedirect(true);
  }, []);

  const playerDidNotRedirect = useCallback(() => {
    setDidRedirect(false);
  }, []);

  const [userName, setUserName] = useState("");

  return (
    <Fragment>
      <ColorContext.Provider
        value={{
          didRedirect: didRedirect,
          playerDidRedirect: playerDidRedirect,
          playerDidNotRedirect: playerDidNotRedirect,
        }}
      >
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={(props: any) => (
                <Onboard setUserName={setUserName} {...props} />
              )}
            ></Route>
            <Route path="/game/:gameid" exact>
              {didRedirect ? (
                <Fragment>
                  <JoinGame userName={userName} isCreator={true} />
                  <ChessGame myUserName={userName} />
                </Fragment>
              ) : (
                <JoinRoom />
              )}
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </ColorContext.Provider>
    </Fragment>
  );
});

export default App;
