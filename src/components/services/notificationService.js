import { useSnackbar } from "notistack";

export const useNotifications = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
};
