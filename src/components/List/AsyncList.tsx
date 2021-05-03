import React, { Fragment, ReactNode, ReactElement } from "react";
import List from "@material-ui/core/List";

import { ListLoader } from "./ListLoader";
import { ListError } from "./ListError";
import { ListEmpty, ListEmptyProps } from "./ListEmpty";
import { AsyncData } from "~types";
import { extractProperty, ValueExtractor } from "~utils";

type ReactListKey = string | number; // c'mon!

interface Props<T> {
  data: AsyncData<T[]>;
  filterPredicate?: (item: T) => boolean;
  className?: string;
  keyExtractor: ValueExtractor<T, ReactListKey>;
  renderItem: (item: T) => ReactNode;
  emptyListMsg?: ReactNode;
  retry?: () => void; // TODO try to use this to allow data reload
}

const AsyncList = function AsyncList<T>({
  data,
  filterPredicate,
  renderItem,
  keyExtractor,
  className,
  emptyListMsg,
  retry,
}: Props<T>): ReactElement {
  if (data.status === "loading") {
    return <ListLoader />;
  }
  if (data.status === "error") {
    return <ListError retry={retry} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const dataAfterFilter = data.data.filter((e) => filterPredicate!(e)); // defaultProps ehh..
  if (dataAfterFilter.length === 0) {
    const Comp = emptyListMsg != null ? emptyListMsg : ListEmpty;
    const props: ListEmptyProps = {
      wasFilteredOut: data.data.length > 0,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.createElement(Comp as any, props);
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
