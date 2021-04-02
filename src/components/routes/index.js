import { makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { store } from "../../state";
import ErrorBoundary from "../common/ErrorBoundary";
import NavigationBar from "../common/NavigationBar";
import Unauthorized from "../pages/Unauthorized";

import { routeConfig } from "./routeConfig";

const useStyles = makeStyles({
  customBackground: {
    backgroundColor: "red",
  },
});

function ApplicationRoutes() {
  const { state } = useContext(store);
  const classes = useStyles();

  return (
    <>
      <Router>
        <NavigationBar />
        <ErrorBoundary>
          <Switch>
            {routeConfig.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                exact={route.isExact}
                component={
                  route.isPrivate
                    ? state.auth.login.success
                      ? route.component
                      : Unauthorized
                    : route.component
                }
              />
            ))}
          </Switch>
        </ErrorBoundary>
      </Router>
    </>
  );
}

export default ApplicationRoutes;
