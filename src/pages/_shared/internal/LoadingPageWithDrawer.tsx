import React from "react";

import { EmptyStaticPage } from "./EmptyStaticPage";
import { ContentLoader } from "~components";

/** Show toolbar, drawer (or drawer button on mobile) and BIG loader */
export const LoadingPageWithDrawer: React.FC = () => {
  return (
    <EmptyStaticPage>
      <ContentLoader />
    </EmptyStaticPage>
  );
};
