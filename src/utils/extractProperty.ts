import { PickByValueType } from "~types";

type ValueExtractorFn<ObjType, RetType> = (obj: ObjType) => RetType;
export type ValueExtractor<ObjType, RetType> =
  | ValueExtractorFn<ObjType, RetType> // function (v: Value)=>RetType
  | keyof PickByValueType<ObjType, RetType>; // property name

/** Extract value from object. Can provide object's key as string or a function */
export const extractProperty = function <ObjType, RetType>(
  item: ObjType,
  keyExtractor: ValueExtractor<ObjType, RetType>
): RetType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultExtractor = (e: ObjType) => (e as any)[keyExtractor];
  const keyExtractFn: ValueExtractor<ObjType, RetType> =
    typeof keyExtractor === "function" ? keyExtractor : defaultExtractor;
  return keyExtractFn(item);
};
