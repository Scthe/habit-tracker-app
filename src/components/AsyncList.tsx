import React, { Fragment, ReactNode, ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { AppTheme } from "theme";
import { AsyncData, PickByValueType } from "~types";
import List from "@material-ui/core/List";

/*
const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
}));*/

type ReactListKey = string | number; // c'mon!
type KeyExtractorFn<ObjType> = (obj: ObjType) => ReactListKey;
type KeyExtractor<ObjType> =
  | KeyExtractorFn<ObjType> // function (v: Value)=>Key
  | keyof PickByValueType<ObjType, ReactListKey>; // property name

const getKey = function <ObjType>(
  keyExtractor: KeyExtractor<ObjType>,
  item: ObjType
): ReactListKey {
  const defaultKeyExtractor = (e: ObjType) => (e as any)[keyExtractor];
  const keyExtractFn: KeyExtractorFn<ObjType> =
    typeof keyExtractor === "function" ? keyExtractor : defaultKeyExtractor;
  return keyExtractFn(item);
};

const DefaultEmptyListMsg: React.FC<unknown> = () => (
  <div>This list is empty</div>
);

interface Props<T> {
  data: AsyncData<T[]>;
  className?: string;
  keyExtractor: KeyExtractor<T>;
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
        <Fragment key={getKey(keyExtractor, item)}>{renderItem(item)}</Fragment>
      ))}
    </List>
  );
}
