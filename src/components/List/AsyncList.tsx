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
  beforeRender?: (items: T[]) => T[];
  className?: string;
  keyExtractor: ValueExtractor<T, ReactListKey>;
  renderItem: (item: T) => ReactNode;
  emptyListMsg?: ReactNode;
  retry?: () => void; // TODO [ux] try to retry if AsyncList request failed
}

const AsyncList = function AsyncList<T>({
  data,
  filterPredicate,
  beforeRender,
  renderItem,
  keyExtractor,
  className,
  emptyListMsg,
  retry,
}: Props<T>): ReactElement {
  if (data.status === "loading" || data.status === "init") {
    return <ListLoader />;
  }
  if (data.status === "error") {
    return <ListError retry={retry} />;
  }

  let dataAfterFilter = data.data.filter((e) => filterPredicate!(e)); // defaultProps ehh..
  if (beforeRender != null) {
    dataAfterFilter = beforeRender(dataAfterFilter);
  }

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
