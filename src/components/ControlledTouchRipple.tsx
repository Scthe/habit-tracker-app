import React, { useCallback } from "react";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";

export type ControlledTouchRippleTriggerRef = React.MutableRefObject<
  null | (() => void)
>;
type ControlledTouchRippleCenterRef = React.RefObject<null | HTMLElement>;

interface Props {
  triggerRef: ControlledTouchRippleTriggerRef;
  centerRef?: ControlledTouchRippleCenterRef;
  className?: string;
}

export { Props as ControlledTouchRippleProps };

const getRippleCenter = (
  centerElRef: ControlledTouchRippleCenterRef | undefined
) => {
  if (centerElRef?.current == null) {
    return undefined;
  }
  const rect = centerElRef.current.getBoundingClientRect();
  return {
    clientX: rect.left,
    clientY: rect.top,
  };
};

// https://stackoverflow.com/questions/66888248/how-do-i-programatically-show-ripple-effect-with-material-ui
// https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/ButtonBase/TouchRipple.js
export const ControlledTouchRipple: React.FC<Props> = ({
  triggerRef,
  centerRef,
  className,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rippleRef: React.RefObject<any> = React.useRef(null); // this is not even public component, we don't have typings

  triggerRef.current = useCallback(() => {
    // we access 'private' functions on internal component btw.
    if (rippleRef.current != null) {
      const fakeEvent = getRippleCenter(centerRef);
      rippleRef.current.start(fakeEvent);
      setTimeout(() => {
        rippleRef.current.stop({});
      }, 500);
    }
  }, [centerRef]);

  return <TouchRipple ref={rippleRef} classes={{ root: className }} />;
};
