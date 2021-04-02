import { Grid, Typography, Link } from "@material-ui/core";
import { useContext } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { store } from "../../../state";

function NormalHome() {
  const { state } = useContext(store);
  return state.auth.login.success ? (
    <Redirect to="/user" />
  ) : (
    <Grid container justify="center" direction="column">
      <Typography
        variant="h4"
        align="center"
        color="secondary"
        style={{ fontWeight: 600 }}
      >
        Expense Calculator
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        style={{ fontWeight: 400 }}
      >
        Manage Financial Information
      </Typography>

      <br />
      {!state.auth.login.success && (
        <Grid container justify="center" direction="row">
          <Link
            component={NavLink}
            to="/login"
            style={{
              marginInline: "50px",
              fontWeight: 600,
              fontSize: "1.2rem",
            }}
          >
            Login
          </Link>

          <Link
            component={NavLink}
            to="/register"
            style={{
              marginInline: "50px",
              fontWeight: 600,
              fontSize: "1.2rem",
            }}
          >
            Register
          </Link>
        </Grid>
      )}
    </Grid>
  );
}

export default NormalHome;
