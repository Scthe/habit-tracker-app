import React, { ReactElement } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { useDesktopLayout } from "~hooks";

type ItenRenderFn<T> = (props: {
  item: T;
  isSelected: boolean;
}) => React.ReactNode;

interface Props<T> {
  name: string;
  title: string;
  open: boolean;
  onClose: (nextValue: T) => void;
  selectedValue: T;
  data: T[];
  children: ItenRenderFn<T>;
}

const ValuePickDialog = function <T>({
  name,
  title,
  open,
  onClose,
  selectedValue,
  data,
  children,
}: Props<T>): ReactElement {
  const isDesktop = useDesktopLayout();

  const titleId = `${name}-dialog-title`;
  const handleClose = () => onClose(selectedValue);
  const handleListItemClick = (value: T) => onClose(value);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby={titleId}
      open={open}
      fullScreen={!isDesktop}
      scroll="paper"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id={titleId}>{title}</DialogTitle>

      <List>
        {data.map((item) => (
          <ListItem key={item} button onClick={() => handleListItemClick(item)}>
            {children({ item, isSelected: item === selectedValue })}
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export { ValuePickDialog };
