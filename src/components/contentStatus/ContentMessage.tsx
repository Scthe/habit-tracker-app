import React from "react";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { AppTheme } from "theme";

const useStyles = makeStyles((theme: AppTheme) => ({
  icon: {
    color: theme.palette.app.fullPageMessage.color,
    fontSize: "200px",
  },
  message: {
    color: theme.palette.app.fullPageMessage.color,
    marginBottom: theme.spacing(3),
  },
}));

interface Props {
  icon: string;
  message: React.ReactNode;
}
export type ContentMessageProps = Props;

/**
 * Big message text and icon. Used for special states.
 *
 * It does not display toolbar or drawer, so if this component is fullscreen,
 * The user cannot do anything else.
 */
export const ContentMessage: React.FC<Props> = ({
  icon,
  message,
  children,
}) => {
  const styles = useStyles();

  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
      justifyContent="center"
    >
      <Icon className={styles.icon}>{icon}</Icon>
      <Typography variant="h6" className={styles.message}>
        {message}
      </Typography>
      {children}
    </Box>
  );
};
