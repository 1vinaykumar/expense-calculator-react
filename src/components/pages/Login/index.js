import {
  Button,
  FormControl,
  FormGroup,
  InputAdornment,
  IconButton,
  TextField,
  Grid,
  Paper,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { store, useAPI, actionTypes } from "../../../state";
import { loginStyles } from "./styles";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { actionHelper } from "../../utilities/stateUtilities";

const validationSchema = Yup.object({
  userName: Yup.string().required().min(5),
  password: Yup.string().min(5).required(),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const { state, dispatch } = useContext(store);
  const { login } = useAPI();
  const classes = loginStyles();

  useEffect(() => {
    if (!state.auth.login.success) {
      dispatch(actionHelper(actionTypes.RESET_LOGIN_STATUS));
    }
  }, []);

  const loginHandler = (values) => {
    login(values);
  };

  return state.auth.login.success ? (
    <Redirect to="/user" />
  ) : (
    <Grid container direction="row" justify="center" alignItems="center">
      <Paper elevation={3} className={classes.paperStyle}>
        <form
          onSubmit={handleSubmit(loginHandler)}
          className={classes.loginForm}
        >
          <Typography variant="h4" gutterBottom align="center">
            Login
          </Typography>
          <FormGroup>
            <FormControl className={classes.inputField}>
              <TextField
                label="User Name"
                inputRef={register}
                type="text"
                name="userName"
                variant="outlined"
                size="small"
                error={!!errors.userName}
                helperText={errors.userName && errors.userName.message}
              />
            </FormControl>
            <FormControl className={classes.inputField}>
              <TextField
                inputRef={register({ required: true })}
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                variant="outlined"
                size="small"
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <Button
              className={classes.loginButton}
              type="submit"
              variant="contained"
              color="primary"
              startIcon={
                state.auth.login.loading && <CircularProgress size={20} />
              }
            >
              Login
            </Button>
          </FormGroup>
        </form>
      </Paper>
    </Grid>
  );
}

export default Login;
