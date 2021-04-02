import { produce } from "immer";
import * as actionTypes from "./actionTypes";
import { initialState, commonStateHelper } from "./store";

export const reducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.RESET_LOGIN_STATUS:
      draft.auth.login = commonStateHelper;
      draft.auth.user = null;
      break;
    case actionTypes.LOGIN_LOADING:
      draft.auth.login.loading = true;
      draft.auth.login.success = false;
      draft.auth.login.failed = false;
      draft.auth.user = null;
      draft.sources.moneySources = [];
      break;
    case actionTypes.LOGIN_SUCCESS:
      draft.error = null;
      draft.auth.login.loading = false;
      draft.auth.login.success = true;
      draft.auth.login.failed = false;
      draft.auth.user = action.payload.user;
      draft.sources.moneySources = action.payload.user.moneySources;
      break;
    case actionTypes.LOGIN_ERROR:
      draft.auth.login.loading = false;
      draft.auth.login.success = false;
      draft.auth.login.failed = true;
      draft.error = action.payload.error;
      break;
    case actionTypes.RESET_REGISTER_STATUS:
      draft.auth.register = commonStateHelper;
      break;
    case actionTypes.REGISTER_LOADING:
      draft.auth.register.loading = true;
      draft.auth.register.success = false;
      draft.auth.register.failed = false;
      break;
    case actionTypes.REGISTER_SUCCESS:
      draft.error = null;
      draft.auth.register.loading = false;
      draft.auth.register.success = true;
      draft.auth.register.failed = false;
      break;
    case actionTypes.REGISTER_ERROR:
      draft.auth.register.loading = false;
      draft.auth.register.success = false;
      draft.auth.register.failed = true;
      draft.error = action.payload.error;
      break;
    case actionTypes.GET_USER_SUCCESS:
      draft.error = null;
      draft.auth.user = action.payload.user;
      draft.sources.moneySources = action.payload.user.moneySources;
      break;
    case actionTypes.GET_USER_ERROR:
      draft.error = action.payload.error;
      break;
    case actionTypes.LOGOUT:
      draft.error = null;
      draft.auth.user = null;
      draft.sources.moneySources = [];
      draft.auth.login.loading = false;
      draft.auth.login.success = false;
      break;
    case actionTypes.RESET_ADD_SOURCE_STATUS:
      draft.sources.add = commonStateHelper;
      break;
    case actionTypes.ADD_SOURCE_LOADING:
      draft.sources.add.loading = true;
      draft.sources.add.success = false;
      draft.sources.add.failed = false;
      draft.error = null;
      break;
    case actionTypes.ADD_SOURCE_SUCCESS:
      draft.sources.add.loading = false;
      draft.sources.add.success = true;
      draft.sources.add.failed = false;
      draft.sources.moneySources.push(action.payload.source);
      draft.error = null;
      break;
    case actionTypes.ADD_SOURCE_ERROR:
      draft.sources.add.loading = false;
      draft.sources.add.success = false;
      draft.sources.add.failed = true;
      draft.error = action.payload.error;
      break;
    case actionTypes.RESET_EDIT_SOURCE_STATUS:
      draft.sources.edit = commonStateHelper;
      break;
    case actionTypes.EDIT_SOURCE_LOADING:
      draft.sources.edit.loading = true;
      draft.sources.edit.success = false;
      draft.sources.edit.failed = false;
      draft.error = null;
      break;
    case actionTypes.EDIT_SOURCE_SUCCESS:
      draft.sources.edit.loading = false;
      draft.sources.edit.success = true;
      draft.sources.edit.failed = false;
      draft.sources.moneySources = draft.sources.moneySources.map((item) =>
        item._id === action.payload.source._id ? action.payload.source : item
      );
      draft.error = null;
      break;
    case actionTypes.EDIT_SOURCE_ERROR:
      draft.sources.edit.loading = false;
      draft.sources.edit.success = false;
      draft.sources.edit.failed = true;
      draft.error = action.payload.error;
      break;
    case actionTypes.RESET_DELETE_SOURCE_STATUS:
      draft.sources.delete = commonStateHelper;
      break;
    case actionTypes.DELETE_SOURCE_LOADING:
      draft.sources.delete.loading = true;
      draft.sources.delete.success = false;
      draft.sources.delete.failed = false;
      draft.error = null;
      break;
    case actionTypes.DELETE_SOURCE_SUCCESS:
      draft.sources.delete.loading = false;
      draft.sources.delete.success = true;
      draft.sources.delete.failed = false;
      draft.sources.moneySources = draft.sources.moneySources.filter(
        (item) => item._id !== action.payload.source._id
      );
      draft.error = null;
      break;
    case actionTypes.DELETE_SOURCE_ERROR:
      draft.sources.delete.loading = false;
      draft.sources.delete.success = false;
      draft.sources.delete.failed = true;
      draft.error = action.payload.error;
      break;
  }
  return draft;
}, initialState);
