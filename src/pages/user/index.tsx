import Button from "@material-ui/core/Button";
import React from "react";
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
      <Debug v={user} />
    </div>
  );
};
