import React from "react";

import { AccountHeader } from "./AccountHeader";
import { AccountFields } from "./AccountFields";
import { AppPageContent } from "pages/_shared";
import { useLoggedUser, useUserPreferences } from "~storage";

interface Props {
  className?: string;
}

const UserDetailsFragment: React.FC<Props> = ({ className }) => {
  const user = useLoggedUser();
  const preferences = useUserPreferences();

  return (
    <>
      <AccountHeader />

      <AppPageContent className={className}>
        <AccountFields user={user} userPreferences={preferences} />
      </AppPageContent>
    </>
  );
};

// used with React.Lazy, but eslint has problems
// eslint-disable-next-line import/no-unused-modules
export default UserDetailsFragment;
