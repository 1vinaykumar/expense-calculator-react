import axiosAPI from "../components/services/axiosAPI";
import _ from "lodash";
import { store } from "./store";
import * as actionTypes from "./actionTypes";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { actionHelper } from "../components/utilities/stateUtilities";
import { useHistory } from "react-router";

export const useAPI = () => {
  const { dispatch, state } = useContext(store);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const login = (loginUser) => {
    dispatch(actionHelper(actionTypes.LOGIN_LOADING));
    axiosAPI
      .post(
        "/users/login/" + loginUser.userName,
        _.pick(loginUser, ["userName", "password"])
      )
      .then((response) => {
        enqueueSnackbar("Login Successful", { variant: "success" });
        localStorage.setItem("loginToken", response.data);
        axiosAPI
          .get("/users/" + loginUser.userName)
          .then((response) => {
            dispatch(
              actionHelper(actionTypes.LOGIN_SUCCESS, { user: response.data })
            );
          })
          .catch((error) => {
            dispatch(actionHelper(actionTypes.LOGIN_ERROR, { error }));
          });
      })
      .catch((error) => {
        enqueueSnackbar("Login Unsuccessful", { variant: "error" });
        dispatch(actionHelper(actionTypes.LOGIN_ERROR, { error }));
      });
  };

  const register = (registerUser) => {
    dispatch(actionHelper(actionTypes.REGISTER_LOADING));
    axiosAPI
      .post("/users", {
        ...registerUser,
        moneyFrom: 0,
        moneyTo: 0,
        available: 0,
        net: 0,
      })
      .then((response) => {
        enqueueSnackbar("Registration Successful", { variant: "success" });
        dispatch(actionHelper(actionTypes.REGISTER_SUCCESS));
        history.push("/");
      })
      .catch((error) => {
        enqueueSnackbar("Registration Unsuccessful", { variant: "error" });
        dispatch(actionHelper(actionTypes.REGISTER_ERROR, { error }));
      });
  };

  const getUser = () => {
    if (state.auth.user) {
      axiosAPI
        .get("/users/" + state.auth.user.userName)
        .then((response) => {
          dispatch(
            actionHelper(actionTypes.GET_USER_SUCCESS, { user: response.data })
          );
        })
        .catch((error) => {
          dispatch(actionHelper(actionTypes.GET_USER_ERROR, { error }));
          if (error && error.response && error.response.status === 401) {
            enqueueSnackbar(
              "Unauthorized Action, logging out!!! Please login again",
              { variant: "error" }
            );
            logout();
          }
        });
    } else {
      enqueueSnackbar("Session Details Not Found", { variant: "error" });
      logout();
    }
  };

  const addSource = (source) => {
    dispatch(actionHelper(actionTypes.ADD_SOURCE_LOADING));
    if (state.auth.user) {
      axiosAPI
        .post(`/users/${state.auth.user.userName}/sources`, source)
        .then((response) => {
          enqueueSnackbar("Add Source Successful", { variant: "success" });
          dispatch(
            actionHelper(actionTypes.ADD_SOURCE_SUCCESS, {
              source: response.data,
            })
          );
          getUser();
          history.push("/user/sources/all");
        })
        .catch((error) => {
          enqueueSnackbar("Add Source Unsuccessful", { variant: "error" });
          dispatch(actionHelper(actionTypes.ADD_SOURCE_ERROR, { error }));
          if (error && error.response && error.response.status === 401) {
            enqueueSnackbar(
              "Unauthorized Action, logging out!!! Please login again",
              { variant: "error" }
            );
            logout();
          }
        });
    } else {
      enqueueSnackbar("Session Details Not Found", { variant: "error" });
      logout();
    }
  };

  const editSource = (sourceId, source) => {
    dispatch(actionHelper(actionTypes.EDIT_SOURCE_LOADING));
    if (state.auth.user) {
      axiosAPI
        .put(`/users/${state.auth.user.userName}/sources/${sourceId}`, source)
        .then((response) => {
          enqueueSnackbar("Edit Source Successful", { variant: "success" });
          dispatch(
            actionHelper(actionTypes.EDIT_SOURCE_SUCCESS, {
              source: response.data,
            })
          );
          getUser();
          history.push("/user/sources/all");
        })
        .catch((error) => {
          enqueueSnackbar("Edit Source Unsuccessful", { variant: "error" });
          dispatch(actionHelper(actionTypes.EDIT_SOURCE_ERROR, { error }));
          if (error && error.response && error.response.status === 401) {
            enqueueSnackbar(
              "Unauthorized Action, logging out!!! Please login again",
              { variant: "error" }
            );
            logout();
          }
        });
    } else {
      enqueueSnackbar("Session Details Not Found", { variant: "error" });
      logout();
    }
  };

  const deleteSource = (source) => {
    dispatch(actionHelper(actionTypes.RESET_DELETE_SOURCE_STATUS));
    dispatch(actionHelper(actionTypes.DELETE_SOURCE_LOADING));
    if (state.auth.user) {
      axiosAPI
        .delete(`/users/${state.auth.user.userName}/sources/${source._id}`)
        .then((response) => {
          enqueueSnackbar("Delete Source Successful", { variant: "success" });
          dispatch(
            actionHelper(actionTypes.DELETE_SOURCE_SUCCESS, {
              source,
            })
          );
          getUser();
        })
        .catch((error) => {
          enqueueSnackbar("Delete Source Unsuccessful", { variant: "error" });
          dispatch(actionHelper(actionTypes.DELETE_SOURCE_ERROR, { error }));
          if (error && error.response && error.response.status === 401) {
            enqueueSnackbar(
              "Unauthorized Action, logging out!!! Please login again",
              { variant: "error" }
            );
            logout();
          }
        });
    } else {
      enqueueSnackbar("Session Details Not Found", { variant: "error" });
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("loginToken");
    dispatch(actionHelper(actionTypes.LOGOUT));
    history.push("/");
  };

  return {
    login,
    registerUser: register,
    logout,
    getUser,
    addSource,
    editSource,
    deleteSource,
  };
};
