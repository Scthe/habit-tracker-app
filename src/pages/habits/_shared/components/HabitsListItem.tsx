import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import clsx from "clsx";

import { AppTheme } from "theme";
import { Habit } from "../../_types";

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    padding: "5px 15px",
    background: theme.palette.background.paper,
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
  renderSubtext: (data: Habit) => React.ReactNode;
  actionElement?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

export const HabitsListItem: React.FC<Props> = ({
  item,
  className,
  renderSubtext,
  actionElement,
  onClick,
}) => {
  const styles = useStyles();

  return (
    <ListItem className={clsx(className, styles.root)}>
      <div className={styles.colorStrip} style={{ background: item.color }} />

      <div className={styles.content} onClick={onClick}>
        <Box fontSize="h6.fontSize" color="text.primary" marginBottom="2px">
          {item.name}
        </Box>
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
