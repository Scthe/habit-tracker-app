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
  filterPredicate?: (item: T) => boolean;
  className?: string;
  keyExtractor: ValueExtractor<T, ReactListKey>;
  renderItem: (item: T) => ReactNode;
  emptyListMsg?: ReactNode;
}

const AsyncList = function AsyncList<T>({
  data,
  filterPredicate,
  renderItem,
  keyExtractor,
  className,
  emptyListMsg,
}: Props<T>): ReactElement {
  // TODO handle loading/error better
  if (data.status === "loading") {
    return <div>Loading...</div>;
  }
  if (data.status === "error") {
    return <div>Error...</div>;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const dataAfterFilter = data.data.filter((e) => filterPredicate!(e)); // defaultProps ehh..
  if (dataAfterFilter.length === 0) {
    const Comp = emptyListMsg != null ? emptyListMsg : DefaultEmptyListMsg;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.createElement(Comp as any, {
      wasFilteredOut: data.data.length > 0,
    });
  }

  return (
    <List className={className}>
      {dataAfterFilter.map((item) => (
        <Fragment key={extractProperty(item, keyExtractor)}>
          {renderItem(item)}
        </Fragment>
      ))}
    </List>
  );
};

AsyncList.defaultProps = {
  filterPredicate: () => true,
};

export { AsyncList };
