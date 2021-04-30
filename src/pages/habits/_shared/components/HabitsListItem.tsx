import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import clsx from "clsx";

import { AppTheme } from "theme";
import { getHabitHtmlColor, Habit } from "../../_types";
import { darken } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    padding: "5px 15px",
    background: theme.palette.background.paper,
    "&:hover": {
      background: darken(theme.palette.background.paper, 0.05),
    },
  },
  colorStrip: {
    minWidth: "8px",
    alignSelf: "stretch",
    borderRadius: "5px",
    flex: "0",
    marginRight: "15px",
  },
  content: {
    flex: "1",
    marginTop: "5px",
    cursor: "pointer",
  },
  action: {
    flex: "0",
  },
}));

interface Props {
  item: Habit;
  className?: string;
  classes?: {
    root?: string;
    content?: string;
    title?: string;
  };
  renderSubtext: (data: Habit) => React.ReactNode;
  actionElement?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

export const HabitsListItem: React.FC<Props> = ({
  item,
  className,
  classes,
  renderSubtext,
  actionElement,
  onClick,
}) => {
  const styles = useStyles();

  return (
    <ListItem className={clsx(className, classes?.root, styles.root)}>
      <div
        className={styles.colorStrip}
        style={{ background: getHabitHtmlColor(item.color) }}
      />

      <div className={clsx(classes?.content, styles.content)} onClick={onClick}>
        <Typography variant="h6" className={classes?.title}>
          {item.name}
        </Typography>
        <Box color="text.secondary" marginBottom="5px">
          {renderSubtext(item)}
        </Box>
      </div>

      {actionElement ? (
        <div className={styles.action}>{actionElement}</div>
      ) : null}
    </ListItem>
  );
};

HabitsListItem.defaultProps = {
  classes: {},
};
