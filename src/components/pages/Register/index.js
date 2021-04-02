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
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { store, useAPI, actionTypes } from "../../../state";
import { registerStyles } from "./styles";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { actionHelper } from "../../utilities/stateUtilities";

const validationSchema = Yup.object({
  name: Yup.string().required().min(3),
  userName: Yup.string().required().min(5),
  password: Yup.string().required().min(8).max(20),
  confirmPassword: Yup.string()
    .required()
    .min(8)
    .max(20)
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function Register() {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { registerUser } = useAPI();
  const classes = registerStyles();
  const { state, dispatch } = useContext(store);

  useEffect(() => {
    dispatch(actionHelper(actionTypes.RESET_REGISTER_STATUS));
  }, []);

  const registerHandler = (values) => {
    delete values.confirmPassword;
    registerUser(values);
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Paper elevation={3} className={classes.paperStyle}>
        <form
          onSubmit={handleSubmit(registerHandler)}
          className={classes.registerForm}
        >
          <Typography variant="h4" gutterBottom align="center">
            Register
          </Typography>
          <FormGroup>
            <FormControl className={classes.inputField}>
              <TextField
                label="Name"
                inputRef={register}
                type="text"
                name="name"
                variant="outlined"
                size="small"
                error={!!errors.name}
                helperText={errors.name && errors.name.message}
              />
            </FormControl>

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
                inputRef={register}
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

            <FormControl className={classes.inputField}>
              <TextField
                inputRef={register}
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                name="confirmPassword"
                variant="outlined"
                size="small"
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword && errors.confirmPassword.message
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <Button
              className={classes.registerButton}
              type="submit"
              variant="contained"
              color="primary"
              startIcon={
                state.auth.register.loading && <CircularProgress size={20} />
              }
            >
              Register
            </Button>
          </FormGroup>
        </form>
      </Paper>
    </Grid>
  );
}

export default Register;
