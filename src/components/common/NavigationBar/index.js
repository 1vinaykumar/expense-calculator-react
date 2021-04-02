import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  Button,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { navigationBarStyles } from "./styles";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { store, useAPI } from "../../../state";

function NavigationBar() {
  const { state } = useContext(store);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { logout } = useAPI();
  const classes = navigationBarStyles();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timeId = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timeId);
    };
  }, [date]);

  const onClickOption = (route) => {
    history.push(route);
    setOpen(false);
  };

  return (
    <>
      <AppBar color="primary" position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="menu"
            color="inherit"
            onClick={() => setOpen((prev) => !prev)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Expense Calculator
          </Typography>

          <Typography variant="subtitle2" className={classes.time}>
            {date.toLocaleTimeString()}
          </Typography>
        </Toolbar>

        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <List className={classes.navOpen}>
            {state.auth.login.success ? (
              <>
                <ListItem
                  button
                  className={classes.listOption}
                  onClick={() => onClickOption("/user")}
                >
                  User Home
                </ListItem>

                <ListItem
                  button
                  onClick={() => onClickOption("/user/sources/add")}
                  className={classes.listOption}
                >
                  Add Source
                </ListItem>

                <ListItem button className={classes.listOption}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                  >
                    Logout
                  </Button>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem
                  button
                  onClick={() => onClickOption("/")}
                  className={classes.listOption}
                >
                  Home
                </ListItem>
                <ListItem
                  button
                  onClick={() => onClickOption("/login")}
                  className={classes.listOption}
                >
                  Login
                </ListItem>
                <ListItem
                  button
                  onClick={() => onClickOption("/register")}
                  className={classes.listOption}
                >
                  Register
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
      </AppBar>
      <div className={classes.navigationSpace}></div>
    </>
  );
}

export default NavigationBar;
