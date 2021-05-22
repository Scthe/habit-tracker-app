import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import purple from "@material-ui/core/colors/purple";
import cyan from "@material-ui/core/colors/cyan";
import teal from "@material-ui/core/colors/teal";
import lime from "@material-ui/core/colors/lime";
import yellow from "@material-ui/core/colors/yellow";
import orange from "@material-ui/core/colors/orange";

import { assertUnreachable } from "utils";
import { HabitColor } from "pages/habits/_types";

export const getHabitHtmlColor = (c: HabitColor): string => {
  switch (c) {
    case HabitColor.Transparent:
      return "#00000000";
    case HabitColor.Red:
      return red["500"];
    case HabitColor.Pink:
      return pink["500"];
    case HabitColor.Purple:
      return purple["500"];
    case HabitColor.Blue:
      return blue["500"];
    case HabitColor.Cyan:
      return cyan["500"];
    case HabitColor.Teal:
      return teal["500"];
    case HabitColor.Green:
      return green["500"];
    case HabitColor.Lime:
      return lime["500"];
    case HabitColor.Yellow:
      return yellow["500"];
    case HabitColor.Orange:
      return orange["500"];
    default:
      return assertUnreachable(c); // compile time error if some case is not handled
  }
};

export const getHabitHtmlTextColor = (c: HabitColor): string => {
  switch (c) {
    case HabitColor.Transparent:
    case HabitColor.Yellow:
    case HabitColor.Lime:
    case HabitColor.Orange:
      return "#212121";
    default:
      return "white";
  }
};
