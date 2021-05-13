import React, { Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import merge from "lodash/merge";
import clsx from "clsx";

import { PageLoader } from "./PageLoader";
import { FullPageMessage, FullPageMessageProps } from "~components";
import { AppTheme } from "theme";

// TODO hamburger menu has to always be visible. even during suspense

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    display: "flex",
  },
  col1: {
    flex: 1,
    ...theme.mixins.viewFragment,
  },
  col2: {
    flex: 1,
    ...theme.mixins.viewFragment,
  },
  detailPaper: {
    ...theme.mixins.viewFragment,
  },
}));

interface Props {
  className?: string;
}

export const MasterDetailsLayout: React.FC<Props> = ({
  className,
  children,
}) => {
  const styles = useStyles();

  return <div className={clsx(styles.root, className)}>{children}</div>;
};

export const MasterView: React.FC<Props> = ({ className, children }) => {
  const styles = useStyles();

  return (
    <div className={clsx(styles.col1, className)}>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </div>
  );
};

interface DetailsViewProps {
  className?: string;
  hasItem: boolean;
  itemFallback?: Partial<FullPageMessageProps>;
  /** key is just to show loader between details. User might not notice change without it */
  detailKey?: string;
}

export const DetailsView: React.FC<DetailsViewProps> = ({
  className,
  itemFallback,
  hasItem,
  detailKey,
  children,
}) => {
  const styles = useStyles();
  const fallbackProps = merge(
    {
      icon: "block",
      message: "No item selected",
    },
    itemFallback
  );

  return (
    <div className={clsx(styles.col2, className)}>
      <Suspense fallback={<PageLoader />}>
        {hasItem ? (
          <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Paper key={detailKey} elevation={9} className={styles.detailPaper}>
              {children}
            </Paper>
          </Slide>
        ) : (
          <FullPageMessage {...fallbackProps} />
        )}
      </Suspense>
    </div>
  );
};
