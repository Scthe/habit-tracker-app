import React from "react";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.primary,
    opacity: 0.1,
    fontSize: "200px",
  },
  message: {
    color: theme.palette.text.disabled,
  },
}));

export interface ListEmptyProps {
  icon?: string;
  wasFilteredOut: boolean;
}

export const ListEmpty: React.FC<ListEmptyProps> = ({
  icon,
  wasFilteredOut,
  children,
}) => {
  const styles = useStyles();

  let textToShow = children;
  if (textToShow == null) {
    textToShow = wasFilteredOut ? "No matching results" : "No results";
  }

  return (
    <Box textAlign="center">
      <Icon className={styles.icon}>{icon}</Icon>
      <Typography variant="h6" className={styles.message}>
        {textToShow}
      </Typography>
    </Box>
  );
};

ListEmpty.defaultProps = {
  icon: "block", // ugh, not the greatest choice
};
