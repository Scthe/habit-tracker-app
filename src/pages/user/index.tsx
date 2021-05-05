import Button from "@material-ui/core/Button";
import React from "react";
import { Debug } from "~components";
import { useAuth, useStorage } from "~firebaseUtils";
import { useCurrentUser } from "~storage";

// eslint-disable-next-line import/no-unused-modules
export default (): JSX.Element => {
  const storage = useStorage();
  console.log({ storage }); // test lazy load?
  const auth = useAuth();
  const user = useCurrentUser();

  return (
    <div>
      <h1>USER PAGE</h1>
      <Button
        color="primary"
        variant="contained"
        onClick={() => auth.signOut()}
      >
        Logout
      </Button>

      <Debug v={user} />
    </div>
  );
};
