import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import sample from "lodash/sample";

import { ROUTES } from "../constants";
import { ListEmpty, ListEmptyProps } from "~components";
import { useInterval } from "~hooks";
import { sec2ms } from "~utils";

const RANDOM_EXAMPLES = [
  "learning German",
  "doing magic tricks",
  "playing the guitar",
  "playing the violin",
  "reading more books",
  "drawing",
  "painting",
  "some me time",
  "playing with a cat",
  "cooking",
  "personal budget",
  "dancing",
  "fitness",
  "chess",
  "sculpting",
  "digital art",
  "arranging flowers",
  "making a gift for someone",
  "paying taxes",
  "calligraphy",
  "biking",
  "running",
];
const getRandomActivity = (currentAct: string | undefined): string => {
  const xs = RANDOM_EXAMPLES.filter((e) => e != currentAct);
  return sample(xs)!;
};

const useStyles = makeStyles((theme) => ({
  createHabit: {
    marginTop: theme.spacing(2),
  },
  linkActivity: {
    color: theme.palette.primary.main,
    textDecoration: "underline",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.disabled,
  },
}));

export const NoHabitsMessage: React.FC<ListEmptyProps> = ({
  children, // e.g. "Create a habit and it will show up here." or "No habits for today"
  ...rest
}) => {
  const styles = useStyles();
  const [currentText, setCurrentText] = useState(getRandomActivity(undefined));

  useInterval(() => setCurrentText(getRandomActivity(currentText)), sec2ms(3));

  return (
    <ListEmpty {...rest}>
      {children}

      <div className={styles.createHabit}>
        <Link to={ROUTES.create} className={styles.link}>
          How about <span className={styles.linkActivity}>{currentText}</span>?
        </Link>
      </div>
    </ListEmpty>
  );
};
