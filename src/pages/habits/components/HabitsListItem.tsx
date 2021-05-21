import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import { darken } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

import { AppTheme } from "../../../theme";
import { Habit } from "../_types";
import { getHabitHtmlColor } from "../utils";
import {
  ControlledTouchRipple,
  ControlledTouchRippleProps,
} from "components/ControlledTouchRipple";

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(0), // required for onClick to work
    background: theme.palette.background.paper,
    "&:hover": {
      background: darken(theme.palette.background.paper, 0.05),
    },
  },
  rootActive: {
    background: darken(theme.palette.background.paper, 0.2),
    "&:hover": {
      background: darken(theme.palette.background.paper, 0.15),
    },
  },
  colorStrip: {
    minWidth: "8px",
    alignSelf: "stretch",
    borderRadius: "5px",
    flex: "0",
    marginRight: theme.spacing(2),
  },
  content: {
    flex: "1",
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(1, 3),
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
  isSelected: boolean;
  TouchRippleProps?: ControlledTouchRippleProps;
}

export const HabitsListItem: React.FC<Props> = ({
  item,
  className,
  classes,
  renderSubtext,
  actionElement,
  onClick,
  isSelected,
  TouchRippleProps,
}) => {
  const styles = useStyles();
  const rootClasses = clsx(
    styles.root,
    className,
    classes?.root,
    isSelected && styles.rootActive
  );

  return (
    <ListItem className={rootClasses}>
      <div className={clsx(classes?.content, styles.content)} onClick={onClick}>
        <div
          className={styles.colorStrip}
          style={{ background: getHabitHtmlColor(item.color) }}
        />

        <div>
          <Typography variant="h6" className={classes?.title}>
            {item.name}
          </Typography>
          <Box color="text.secondary">{renderSubtext(item)}</Box>
        </div>
      </div>

      {actionElement ? (
        <div className={styles.action}>{actionElement}</div>
      ) : null}

      {TouchRippleProps != null ? (
        <ControlledTouchRipple {...TouchRippleProps} />
      ) : null}
    </ListItem>
  );
};

HabitsListItem.defaultProps = {
  classes: {},
};
