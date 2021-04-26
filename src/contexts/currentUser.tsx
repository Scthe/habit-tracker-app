import React, { useRef, useContext } from "react";
import cloneDeep from "lodash/cloneDeep";

export type CurrentUser = {
  name: string;
  surname: string;
  mail: string;
};
type AuthCtxType = { user: CurrentUser };

const INIT_USER_STATE: AuthCtxType = {
  user: {
    name: "m",
    surname: "m",
    mail: "m@gmai.com",
  },
};

export const CurrentUserContext = React.createContext<AuthCtxType>(
  INIT_USER_STATE
);

export const UserContext: React.FC = ({ children }) => {
  const appState = useRef<AuthCtxType>(cloneDeep(INIT_USER_STATE));

  // TODO subscribe to firebase
  // const applyChange = (from: number, to: number) => {
  // const newState = ...;
  // ...
  // };
  // return [appState.current, applyChange];

  return (
    <CurrentUserContext.Provider value={appState.current}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = (): CurrentUser | null => {
  const ctx = useContext(CurrentUserContext);
  return ctx.user;
};
