import React, { Fragment, ReactNode, ReactElement } from "react";
import List from "@material-ui/core/List";

import { AsyncData } from "~types";
import { extractProperty, ValueExtractor } from "~utils";

type ReactListKey = string | number; // c'mon!

const DefaultEmptyListMsg: React.FC<unknown> = () => (
  <div>This list is empty</div>
);

interface Props<T> {
  data: AsyncData<T[]>;
  className?: string;
  keyExtractor: ValueExtractor<T, ReactListKey>;
  renderItem: (item: T) => ReactNode;
  emptyListMsg?: ReactNode;
}

export function AsyncList<T>({
  data,
  renderItem,
  keyExtractor,
  className,
  emptyListMsg,
}: Props<T>): ReactElement {
  // const styles = useStyles();

  // TODO handle loading/error better
  if (data.status === "loading") {
    return <div>Loading...</div>;
  }
  if (data.status === "error") {
    return <div>Error...</div>;
  }
  if (data.data.length === 0) {
    const Comp = emptyListMsg != null ? emptyListMsg : DefaultEmptyListMsg;
    return React.createElement(Comp as any);
  }

  return (
    <List className={className}>
      {data.data.map((item) => (
        <Fragment key={extractProperty(item, keyExtractor)}>
          {renderItem(item)}
        </Fragment>
      ))}
    </List>
  );
}
