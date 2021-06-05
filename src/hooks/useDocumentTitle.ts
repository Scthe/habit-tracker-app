import { useEffect } from "react";

export function useDocumentTitle(title: string): void {
  useEffect(
    function () {
      document.title = title;
    },
    [title]
  );
}
