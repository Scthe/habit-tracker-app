import React from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import grey from "@material-ui/core/colors/grey";
import Icon from "@material-ui/core/Icon";

import { getHabitHtmlColor } from "../../_shared";
import { HabitColor, HabitColorList } from "../../_types";
import { ValuePickDialog } from "~components";

export const ColorPreview: React.FC<{
  color: HabitColor;
  className?: string;
  isSelected?: boolean;
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
      {props.isSelected ? <Icon>check</Icon> : " "}
    </Avatar>
  );
};

interface Props {
  onClose: (nextCol: HabitColor) => void;
  open: boolean;
  selectedValue: HabitColor;
}

export const ColorSelectDialog: React.FC<Props> = ({
  onClose,
  open,
  selectedValue,
}) => {
  return (
    <ValuePickDialog<HabitColor>
      name="color"
      title="Select color"
      data={HabitColorList}
      open={open}
      onClose={onClose}
      selectedValue={selectedValue}
    >
      {(item) => (
        <>
          <ListItemAvatar>
            <ColorPreview color={item.item} isSelected={item.isSelected} />
          </ListItemAvatar>
          <ListItemText primary={HabitColor[item.item]} />
        </>
      )}
    </ValuePickDialog>
  );
};
