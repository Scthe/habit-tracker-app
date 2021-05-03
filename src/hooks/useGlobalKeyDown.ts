/*
MIT License

Copyright (c) 2017 Dmitriy Kovalenko

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import * as React from "react";

const useIsomorphicEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

type KeyCb = () => void;
type KeyHandlers = Record<string, KeyCb>;

function runKeyHandler(
  event: KeyboardEvent | React.KeyboardEvent,
  keyHandlers: KeyHandlers
) {
  const handler = keyHandlers[event.key] as KeyCb | null;
  if (handler != null) {
    handler();
    // if event was handled prevent other side effects (e.g. page scroll)
    event.preventDefault();
  }
}
export function useGlobalKeyDown(
  active: boolean,
  keyHandlers: KeyHandlers
): void {
  const keyHandlersRef = React.useRef(keyHandlers);
  keyHandlersRef.current = keyHandlers;

  useIsomorphicEffect(() => {
    if (active) {
      const handleKeyDown = (event: KeyboardEvent) => {
        runKeyHandler(event, keyHandlersRef.current);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }

    return undefined;
  }, [active]);
}
