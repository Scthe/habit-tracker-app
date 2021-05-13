import React from "react";
import Button from "@material-ui/core/Button";

import { getHabitHtmlColor, getHabitHtmlTextColor } from "pages/habits/utils";
import { HabitColorList } from "pages/habits/_types";
import { oppositeThemeColor, useTheme } from "theme/useTheme";
import { Debug } from "~components";
import { useAuth, useStorage } from "~firebaseUtils";
import { useUserStatus } from "~storage";

// TODO finish me

// eslint-disable-next-line import/no-unused-modules
export default (): JSX.Element => {
  const storage = useStorage();
  console.log({ storage }); // test lazy load?
  const auth = useAuth();
  const user = useUserStatus();

  const [themeColor, toggleThemeColor] = useTheme();
  const nextThemeColor = oppositeThemeColor(themeColor);

  return (
    <div>
      <h1>USER PAGE</h1>

      <hr />
      <Button
        color="primary"
        variant="contained"
        onClick={() => auth.signOut()}
      >
        Logout
      </Button>

      <hr />
      <Button color="primary" variant="contained" onClick={toggleThemeColor}>
        Make it {nextThemeColor}
      </Button>

      <hr />
      {HabitColorList.map((col) => (
        <div
          key={col}
          style={{
            color: getHabitHtmlTextColor(col),
            background: getHabitHtmlColor(col),
            padding: "10px",
          }}
        >
          hellow
        </div>
      ))}

      <hr />
      <Debug v={user} />
    </div>
  );
};
