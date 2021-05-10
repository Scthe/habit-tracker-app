import React, { useCallback } from "react";
import Snackbar, {
  SnackbarCloseReason,
  SnackbarProps,
} from "@material-ui/core/Snackbar";
import create from "zustand";
import Slide from "@material-ui/core/Slide";
import merge from "lodash/merge";
import { makeStyles } from "@material-ui/core/styles";
import { blue, green, orange, red } from "@material-ui/core/colors";

const DEFAULT_PROPS: Partial<SnackbarProps> = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  autoHideDuration: 6000,
  TransitionComponent: Slide,
};

type CustomizableSnackbarProps = Partial<
  Pick<
    SnackbarProps,
    | "action"
    | "anchorOrigin"
    | "autoHideDuration"
    | "message"
    | "onClose"
    | "className"
    | "classes"
    | "ContentProps"
  >
> & {
  severity?: "error" | "warning" | "info" | "success";
};

const useStyles = makeStyles((theme) => ({
  default: {},
  error: {
    background: red["500"],
    color: theme.palette.common.white,
  },
  warning: {
    background: orange["500"],
    color: theme.palette.common.white,
  },
  info: {
    background: blue["500"],
    color: theme.palette.common.white,
  },
  success: {
    background: green["500"],
    color: theme.palette.common.white,
  },
}));

type AlertId = number;

interface AlertDesc {
  id: AlertId;
  props: CustomizableSnackbarProps;
}

type AlertStorage = {
  alerts: AlertDesc[];
  showAlert: (props: CustomizableSnackbarProps) => void;
  dismissAlert: (id: AlertId) => void;
};
export type ShowAlertFn = AlertStorage["showAlert"];

let nextId: AlertId = 1;

const useAlertStorage = create<AlertStorage>((set) => ({
  alerts: [],
  showAlert: (props: CustomizableSnackbarProps) =>
    set(
      (state) => ({
        ...state,
        alerts: [...state.alerts, { id: nextId++, props }],
      }),
      true
    ),
  dismissAlert: (id: AlertId) =>
    set(
      (state) => ({
        ...state,
        alerts: state.alerts.filter((e) => e.id !== id),
      }),
      true
    ),
}));

export const AlertProvider: React.FC = ({ children }) => {
  const styles = useStyles();
  const dismissAlert = useAlertStorage((s) => s.dismissAlert);
  const alerts = useAlertStorage((s) => s.alerts);
  const { id, props } = alerts[0] || {};
  const onClose = props?.onClose;

  const handleClose = useCallback(
    (e: React.SyntheticEvent<unknown, Event>, reason: SnackbarCloseReason) => {
      dismissAlert(id);
      onClose && onClose(e, reason);
    },
    [id, dismissAlert, onClose]
  );

  const severity = props?.severity || "default";
  const finalProps = merge(DEFAULT_PROPS, props || {}, {
    ContentProps: {
      classes: {
        root: styles[severity],
      },
    },
  });

  return (
    <>
      {children}
      <Snackbar
        {...finalProps}
        key={id}
        open={id != null}
        onClose={handleClose}
      />
    </>
  );
};

export function useShowAlert(): ShowAlertFn {
  const showAlert = useAlertStorage((s) => s.showAlert);
  return showAlert;
}
