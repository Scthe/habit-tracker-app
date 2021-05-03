import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import grey from "@material-ui/core/colors/grey";

import { getHabitHtmlColor } from "../../_shared";
import { HabitColor, HabitColorList } from "../../_types";
import { useDesktopLayout } from "~hooks";

export const ColorPreview: React.FC<{
  color: HabitColor;
  className?: string;
}> = (props) => {
  return (
    <Avatar
      variant="square"
      className={props.className}
      style={{
        background: getHabitHtmlColor(props.color),
        border: `1px solid ${grey["500"]}`,
      }}
    >
      {" "}
    </Avatar>
  );
};

interface Props {
  onClose: (nextCol: HabitColor) => void;
  open: boolean;
  selectedValue: HabitColor;
}

// TODO use ValuePickDialog
export const ColorSelectDialog: React.FC<Props> = ({
  onClose,
  open,
  selectedValue,
}) => {
  const isDesktop = useDesktopLayout();

  const handleClose = () => onClose(selectedValue);
  const handleListItemClick = (value: HabitColor) => onClose(value);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="color-dialog-title"
      open={open}
      fullScreen={!isDesktop}
      scroll="paper"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="color-dialog-title">Select color</DialogTitle>

      <List>
        {HabitColorList.map((color) => (
          <ListItem
            key={color}
            button
            onClick={() => handleListItemClick(color)}
          >
            {/* TODO mark selected. Avatar can display 'check' icon maybe? */}
            <ListItemAvatar>
              <ColorPreview color={color} />
            </ListItemAvatar>
            <ListItemText primary={HabitColor[color]} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
