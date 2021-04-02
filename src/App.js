import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";
import { useEffect, useReducer } from "react";
import ApplicationRoutes from "./components/routes";
import { store, reducer } from "./state";
import { initialState } from "./state/store";

const storedState = localStorage.getItem("ecState");

function App() {
  const [state, dispatch] = useReducer(
    reducer,
    storedState ? JSON.parse(storedState) : initialState
  );

  useEffect(() => {
    window.onbeforeunload = () => {
      localStorage.setItem("ecState", JSON.stringify(state));
    };
  }, [state]);

  return (
    <store.Provider value={{ state, dispatch }}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <CssBaseline />
        <ApplicationRoutes />
      </SnackbarProvider>
    </store.Provider>
  );
}

export default App;
