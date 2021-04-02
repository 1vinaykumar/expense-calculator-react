import { Grid, Typography, Link } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { store, useAPI } from "../../../../state";
import { Link as RouteLink } from "react-router-dom";

import TabDetails from "./TabDetails";

function UserDashboard() {
  const { state } = useContext(store);
  const { getUser } = useAPI();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        style={{ paddingBlock: "1rem", fontWeight: "bold" }}
      >
        <small>Hi, </small>
        {state.auth.user.name}
      </Typography>
      <Grid container spacing={0} justify="center">
        <Grid item xs={10} sm={5} md={2}>
          <TabDetails
            name="Available"
            amount={state.auth.user.available || 0}
            color="blue"
            sourceType="available"
          />
        </Grid>

        <Grid item xs={10} sm={5} md={2}>
          <TabDetails
            name="Money From"
            amount={state.auth.user.moneyFrom || 0}
            color="green"
            sourceType="moneyFrom"
          />
        </Grid>

        <Grid item xs={10} sm={5} md={2}>
          <TabDetails
            name="Money To"
            amount={state.auth.user.moneyTo || 0}
            color="red"
            sourceType="moneyTo"
          />
        </Grid>

        <Grid item xs={10} sm={5} md={2}>
          <TabDetails
            name="Net"
            amount={state.auth.user.net || 0}
            color="orange"
            sourceType="all"
          />
        </Grid>
      </Grid>

      <Grid container justify="center" style={{ marginBlock: "2rem" }}>
        <Link component={RouteLink} to="/user/sources/add">
          Add Money Source
        </Link>
      </Grid>
    </>
  );
}

export default UserDashboard;
