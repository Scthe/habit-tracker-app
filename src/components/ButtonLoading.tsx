import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button, { ButtonProps } from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import get from "lodash/get";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    marginLeft: 0,
    marginRight: theme.spacing(1),
  },
}));

interface Props extends ButtonProps {
  isLoading: boolean;
  loading?: {
    size?: number;
    className?: number;
  };
}

export const ButtonLoading: React.FC<Props> = (props) => {
  const styles = useStyles();
  const { isLoading, loading, children, ...buttonProps } = props;

  const loadingClassName = get(loading, "className", "");
  const loadingSize = get(loading, "size", 20);

  return (
    <>
      <Button {...buttonProps} disabled={props.disabled || isLoading}>
        {isLoading ? (
          <CircularProgress
            className={clsx(styles.circularProgress, loadingClassName)}
            size={loadingSize}
            color={buttonProps.color}
          />
        ) : null}

        {children}
      </Button>
    </>
  );
};
