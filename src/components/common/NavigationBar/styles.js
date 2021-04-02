import { makeStyles } from "@material-ui/core/styles";

export const navigationBarStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  navigationSpace: {
    marginBottom: "60px",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "120px",
    },
  },
  navOpen: {
    width: "280px",
    marginTop: 10,
  },
  time: {
    marginRight: theme.spacing(2),
  },
  listOption: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
}));
