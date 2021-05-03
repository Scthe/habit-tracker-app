import { useHistory } from "react-router-dom";
import { useCurrentUser } from "~storage";

/** TODO remove */
export const useAuthorize = (): ReturnType<typeof useCurrentUser> => {
  const user = useCurrentUser();
  const history = useHistory();

  if (user == null) {
    history.replace("/");
    return null;
  }

  return user;
};
