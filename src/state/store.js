import { createContext } from "react";

export const commonStateHelper = {
  loading: false,
  success: false,
  failed: false,
};

export const initialState = {
  auth: {
    user: null,
    register: commonStateHelper,
    login: commonStateHelper,
  },
  sources: {
    moneySources: [],
    add: commonStateHelper,
    edit: commonStateHelper,
    delete: commonStateHelper,
  },
  error: null,
};

export const store = createContext();
